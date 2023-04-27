package cmd

import (
	"backend/internal/config"
	"backend/internal/domain/services/userservice"
	"backend/internal/domain/usecases/authusecase"
	"backend/internal/domain/usecases/userusecase"
	httpServer "backend/internal/httpServer/v1"
	"backend/internal/repositories/userstorage"
	"backend/pkg/database/postgres"
	"backend/pkg/logger"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/spf13/cobra"
	"go.uber.org/dig"
)

var serverCmd = cobra.Command{
	Use: "server",
	Run: func(cmd *cobra.Command, args []string) {
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

		// db
		err = c.Provide(func(log logger.Logger, conf *config.Config) (*pgxpool.Pool, error) {
			return postgres.NewPostgresClient(conf.Postgres, postgres.WithLogger(log))
		})
		if err != nil {
			panic(err)
		}

		err = c.Provide(userstorage.NewUserStorage, dig.As(new(userservice.Repository)))
		if err != nil {
			panic(err)
		}

		// services
		err = c.Provide(userservice.NewUserService, dig.As(new(userusecase.UserService), new(authusecase.UserService)))
		if err != nil {
			panic(err)
		}

		// usecases
		err = c.Provide(userusecase.NewUserUsecase, dig.As(new(httpServer.UserUsecase)))
		if err != nil {
			panic(err)
		}

		err = c.Provide(authusecase.NewAuthUsecase, dig.As(new(httpServer.AuthUsecase)))
		if err != nil {
			panic(err)
		}

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
	},
}

type Server interface {
	Run() error
}

func init() {
	rootCmd.AddCommand(&serverCmd)
}
