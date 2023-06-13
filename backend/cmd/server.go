package main

import (
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
	"backend/pkg/logger"
	"go.uber.org/dig"
)

type Server interface {
	Run() error
}

func main() {
	StartServer()
}

func StartServer() {
	var err error

	c := dig.New()

	err = c.Provide(config.NewConfig)
	if err != nil {
		panic(err)
	}

	err = c.Provide(logger.NewDev)
	if err != nil {
		panic(err)
	}

	err = c.Provide(func(log logger.Logger, conf *config.Config) (postgres.PgxPool, error) {
		return postgres.NewPostgresClient(conf.Postgres, postgres.WithLogger(log))
	})
	if err != nil {
		panic(err)
	}

	RegisterAdapters(c)
	RegisterStorages(c)
	RegisterServices(c)
	RegisterUsecases(c)

	// server
	err = c.Provide(httpServer.NewServer, dig.As(new(Server)))
	if err != nil {
		panic(err)
	}

	err = c.Invoke(func(server Server, log logger.Logger) error {
		log.Info("Start app!")
		return server.Run()
	})
	if err != nil {
		panic(err)
	}
}

func RegisterAdapters(c *dig.Container) {
	err := c.Provide(mailadapter.NewMailAdapter, dig.As(new(mailservice.MailProvider)))
	if err != nil {
		panic(err)
	}
}

func RegisterStorages(c *dig.Container) {
	err := c.Provide(userstorage.NewUserStorage, dig.As(new(userservice.Repository)))
	if err != nil {
		panic(err)
	}

	// for recover password kv store
	err = c.Provide(kvstorage.NewKVStorage, dig.As(new(recoverpasswordcodeservice.KVRepo)))
	if err != nil {
		panic(err)
	}

	// for confirm email kv store
	err = c.Provide(kvstorage.NewKVStorage, dig.As(new(confirmemailcodeservice.KVRepo)))
	if err != nil {
		panic(err)
	}

	err = c.Provide(credentialstorage.NewCredentialStorage, dig.As(new(credentialservice.CredentialRepository)))
	if err != nil {
		panic(err)
	}
}

func RegisterServices(c *dig.Container) {
	err := c.Provide(confirmemailcodeservice.New, dig.As(new(authusecase.ConfirmEmailCodeService)))
	if err != nil {
		panic(err)
	}

	err = c.Provide(recoverpasswordcodeservice.New, dig.As(new(authusecase.RecoverPasswordCodeService)))
	if err != nil {
		panic(err)
	}

	err = c.Provide(credentialservice.NewCredentialService, dig.As(new(authusecase.CredentialService)))
	if err != nil {
		panic(err)
	}

	err = c.Provide(mailservice.NewMailService, dig.As(new(authusecase.MailService)))
	if err != nil {
		panic(err)
	}

	err = c.Provide(userservice.NewUserService, dig.As(new(userusecase.UserService), new(authusecase.UserService)))
	if err != nil {
		panic(err)
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
