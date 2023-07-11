package main

import (
	"backend/internal/adapters/mailadapter"
	"backend/internal/config"
	"backend/internal/domain/models"
	"backend/internal/domain/services/confirmEmailCodeService"
	"backend/internal/domain/services/mailservice"
	"backend/internal/domain/services/recoverPasswordCodeService"
	"backend/internal/domain/services/userservice"
	"backend/internal/domain/usecases/authusecase"
	"backend/internal/domain/usecases/userusecase"
	httpServer "backend/internal/httpServer/v1"
	"backend/internal/repositories/kvstorage"
	"backend/internal/repositories/userstorage"
	"backend/pkg/database/postgres"
	redis2 "backend/pkg/database/redis"
	"backend/pkg/logger"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"
	"go.uber.org/dig"
)

func RegisterServices(c *dig.Container) {
	panicIfError(c.Provide(mailservice.NewMailService, dig.As(new(authusecase.MailService))))
	panicIfError(c.Provide(userservice.NewUserService, dig.As(
		new(authusecase.UserService),
		new(userusecase.UserService),
	)))
	panicIfError(c.Provide(recoverpasswordcodeservice.New, dig.As(new(authusecase.RecoverPasswordCodeService))))
	panicIfError(c.Provide(confirmemailcodeservice.New, dig.As(new(authusecase.ConfirmEmailCodeService))))
}

func RegisterAdapters(c *dig.Container) {
	panicIfError(c.Provide(mailadapter.NewMailAdapter, dig.As(new(mailservice.MailProvider))))
}

func RegisterUsecases(c *dig.Container) {
	panicIfError(c.Provide(authusecase.NewAuthUsecase))
	panicIfError(c.Provide(userusecase.NewUsecase))
}

func RegisterLogger(c *dig.Container) {
	panicIfError(c.Provide(logger.NewDev))
}

func RegisterConnectors(c *dig.Container) {
	panicIfError(c.Provide(func(log logger.Logger, conf *config.Config) (*pgxpool.Pool, error) {
		return postgres.NewPostgresClient(conf.Postgres, postgres.WithLogger(log))
	}))
	panicIfError(c.Provide(func(conf *config.Config) (*redis.Client, error) {
		return redis2.NewRedisClient(conf.Redis.URL)
	}))
}

func RegisterConfig(c *dig.Container) {
	panicIfError(c.Provide(func() (*config.Config, error) {
		conf, err := config.NewConfig()
		return conf, err
	}))
}

func RegisterServer(c *dig.Container) {
	panicIfError(c.Provide(httpServer.NewServer))
}

func RegisterStorages(c *dig.Container) {
	panicIfError(c.Provide(userstorage.NewUserStorage, dig.As(new(userservice.Repository))))
	panicIfError(c.Provide(func(rdb *redis.Client) confirmemailcodeservice.KVRepo {
		return kvstorage.NewKVStorage[*models.ConfirmEmailCode](rdb)
	}))
	panicIfError(c.Provide(func(rdb *redis.Client) recoverpasswordcodeservice.KVRepo {
		return kvstorage.NewKVStorage[*models.RecoverPassword](rdb)
	}))
}
