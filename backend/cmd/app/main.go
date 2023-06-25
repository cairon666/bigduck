package main

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"backend/internal/config"
	httpServer "backend/internal/httpServer/v1"
	"backend/pkg/logger"
	"backend/pkg/tracing"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/nats-io/nats.go"
	"github.com/redis/go-redis/v9"
	"go.opentelemetry.io/otel/sdk/resource"
	"go.uber.org/dig"
)

func main() {
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

	InvokeTracing(c)
	InvokeServer(c)
}

func InvokeTracing(c *dig.Container) {
	err := c.Provide(func(conf *config.Config) *resource.Resource {
		return tracing.NewResource(tracing.Config{
			ServiceID:      conf.Trace.ServiceID,
			ServiceName:    conf.Trace.ServiceName,
			ServiceVersion: conf.Trace.ServiceVersion,
			EnvName:        conf.Trace.EnvName,
		})
	})
	if err != nil {
		panic(fmt.Errorf("cant provide *resource.Resource: %w", err))
	}

	err = c.Invoke(func(conf *config.Config, rsr *resource.Resource) error {
		_, err := tracing.NewTracer(conf.Trace.TraceGRPCAddr, rsr)
		return err
	})
	if err != nil {
		panic(fmt.Errorf("cant create NewTracer: %w", err))
	}

	err = c.Invoke(func(conf *config.Config, rsr *resource.Resource) error {
		_, err := tracing.NewMetric(conf.Trace.MetricGRPCAddr, rsr)
		return err
	})
	if err != nil {
		panic(fmt.Errorf("cant create NewMetric: %w", err))
	}
}

func InvokeServer(c *dig.Container) {
	err := c.Invoke(func(
		server *httpServer.Server,
		log logger.Logger,
		pgxPool *pgxpool.Pool,
		natsConn *nats.Conn,
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
				natsConn.Close()
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
