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

	"backend/internal/adapters/mailadapter"
	"backend/internal/config"
	confirmemailcodeservice "backend/internal/domain/services/confirmEmailCodeService"
	"backend/internal/domain/services/credentialservice"
	"backend/internal/domain/services/mailservice"
	recoverpasswordcodeservice "backend/internal/domain/services/recoverPasswordCodeService"
	"backend/internal/domain/services/userservice"
	"backend/internal/domain/usecases/authusecase"
	"backend/internal/domain/usecases/userusecase"
	httpServer "backend/internal/httpServer/v1"
	"backend/internal/repositories/credentialstorage"
	"backend/internal/repositories/kvstorage"
	"backend/internal/repositories/userstorage"
	"backend/pkg/database/postgres"
	"backend/pkg/database/redis"
	"backend/pkg/logger"
	"backend/pkg/tracing"
	"github.com/jackc/pgx/v5/pgxpool"
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
	RegisterPostgres(c)
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
		pool *pgxpool.Pool,
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

				pool.Close()
				//nolint:nolintlint,godox    // TODO: close redis
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

func RegisterAdapters(c *dig.Container) {
	err := c.Provide(mailadapter.NewMailAdapter, dig.As(new(mailservice.MailProvider)))
	if err != nil {
		panic(fmt.Errorf("fail provide mailadapter.NewMailAdapter %w", err))
	}
}

func RegisterStorages(c *dig.Container) {
	err := c.Provide(credentialstorage.NewCredentialStorage, dig.As(new(credentialservice.CredentialRepository)))
	if err != nil {
		panic(fmt.Errorf("fail provide credentialstorage.NewCredentialStorage %w", err))
	}

	err = c.Provide(userstorage.NewUserStorage, dig.As(new(userservice.Repository)))
	if err != nil {
		panic(fmt.Errorf("fail provide userstorage.NewUserStorage %w", err))
	}

	// for confirm email kv store
	err = c.Provide(func(conf *config.Config) (confirmemailcodeservice.KVRepo, error) {
		rdb, err := redis.NewRedisClient(conf.Redis.ConfirmEmail)
		if err != nil {
			return nil, err
		}

		return kvstorage.NewKVStorage(rdb, conf.Redis.ConfirmEmailTTL), nil
	})
	if err != nil {
		panic(fmt.Errorf("fail provide confirmemailcodeservice.KVRepo %w", err))
	}

	// for recover password kv store
	err = c.Provide(func(conf *config.Config) (recoverpasswordcodeservice.KVRepo, error) {
		rdb, err := redis.NewRedisClient(conf.Redis.RecoverPassword)
		if err != nil {
			return nil, err
		}

		return kvstorage.NewKVStorage(rdb, conf.Redis.RecoverPasswordTTL), nil
	})
	if err != nil {
		panic(fmt.Errorf("fail provide recoverpasswordcodeservice.KVRepo %w", err))
	}
}

func RegisterServices(c *dig.Container) {
	err := c.Provide(confirmemailcodeservice.New, dig.As(new(authusecase.ConfirmEmailCodeService)))
	if err != nil {
		panic(fmt.Errorf("fail provide confirmemailcodeservice %w", err))
	}

	err = c.Provide(recoverpasswordcodeservice.New, dig.As(new(authusecase.RecoverPasswordCodeService)))
	if err != nil {
		panic(fmt.Errorf("fail provide recoverpasswordcodeservice %w", err))
	}

	err = c.Provide(credentialservice.NewCredentialService, dig.As(new(authusecase.CredentialService)))
	if err != nil {
		panic(fmt.Errorf("fail provide NewCredentialService %w", err))
	}

	err = c.Provide(mailservice.NewMailService, dig.As(new(authusecase.MailService)))
	if err != nil {
		panic(fmt.Errorf("fail provide NewMailService %w", err))
	}

	err = c.Provide(userservice.NewUserService, dig.As(new(userusecase.UserService), new(authusecase.UserService)))
	if err != nil {
		panic(fmt.Errorf("fail provide NewUserService %w", err))
	}
}

func RegisterUsecases(c *dig.Container) {
	err := c.Provide(userusecase.NewUserUsecase)
	if err != nil {
		panic(err)
	}

	err = c.Provide(authusecase.NewAuthUsecase)
	if err != nil {
		panic(err)
	}
}

func RegisterLogger(c *dig.Container) {
	err := c.Provide(logger.NewDev)
	if err != nil {
		panic(fmt.Errorf("fail provide logger %w", err))
	}
}

func RegisterPostgres(c *dig.Container) {
	err := c.Provide(func(log logger.Logger, conf *config.Config) (*pgxpool.Pool, error) {
		return postgres.NewPostgresClient(conf.Postgres, postgres.WithLogger(log))
	})
	if err != nil {
		panic(fmt.Errorf("fail provide *pgxpool.Pool %w", err))
	}
}

func RegisterConfig(c *dig.Container) {
	err := c.Provide(config.NewConfig)
	if err != nil {
		panic(fmt.Errorf("fail provide config %w", err))
	}
}

func RegisterServer(c *dig.Container) {
	err := c.Provide(httpServer.NewServer)
	if err != nil {
		panic(fmt.Errorf("fail provide NewServer %w", err))
	}
}
