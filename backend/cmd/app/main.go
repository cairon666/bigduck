package main

import (
	"context"
	"errors"
	"flag"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"backend/internal/config"
	httpServer "backend/internal/httpServer/v1"
	"backend/pkg/logger"
	"github.com/jackc/pgx/v5/pgxpool"
	_ "github.com/jackc/pgx/v5/stdlib"
	"github.com/pressly/goose/v3"
	"github.com/redis/go-redis/v9"
	"go.uber.org/dig"
)

var (
	flagDir = flag.String("dir", "./migrations/sql", "Directory with migration files. Default is ./migrations/sql")
)

func main() {
	flag.Parse()

	StartServer()
}

func StartServer() {
	c := dig.New()

	RegisterConfig(c)
	RegisterLogger(c)
	RegisterConnectors(c)
	RegisterAdapters(c)
	RegisterStorages(c)
	RegisterServices(c)
	RegisterUsecases(c)
	RegisterServer(c)

	InvokeMigrations(c)
	InvokeTracing(c)
	InvokeServer(c)
}

func InvokeMigrations(c *dig.Container) {
	panicIfError(c.Invoke(func(conf *config.Config) error {
		db, err := goose.OpenDBWithDriver("pgx", conf.Postgres)
		if err != nil {
			return fmt.Errorf("goose: failed to open DB: %w", err)
		}

		if err := goose.Run("up", db, *flagDir); err != nil {
			return fmt.Errorf("goose up: %w", err)
		}

		if err := db.Close(); err != nil {
			return fmt.Errorf("goose: failed to close DB: %w", err)
		}

		return nil
	}))
}

func InvokeServer(c *dig.Container) {
	err := c.Invoke(func(
		server *httpServer.Server,
		log logger.Logger,
		pgxPool *pgxpool.Pool,
		rdb *redis.Client,
	) {
		errC := make(chan error, 1)

		ctx, stop := signal.NotifyContext(context.Background(),
			os.Interrupt,
			syscall.SIGTERM,
			syscall.SIGQUIT)

		go func() {
			<-ctx.Done()

			log.Info("Shutdown signal received")

			ctxTimeout, cancel := context.WithTimeout(context.Background(), 10*time.Second) //nolint:gomnd

			defer func() {
				_ = log.Sync()

				pgxPool.Close()
				rdb.Close()
				stop()
				cancel()
				close(errC)
			}()

			server.SetKeepAlivesEnabled(false)

			if err := server.Shutdown(ctxTimeout); err != nil { //nolint: contextcheck
				errC <- err
			}
		}()

		go func() {
			log.Info("Start app!")
			if err := server.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
				errC <- err
			}
		}()

		<-errC
	})
	if err != nil {
		panic(fmt.Errorf("fail invoke server %w", err))
	}
}
