package cmd

import (
	"backend/internal/config"
	"backend/internal/domain/services/userService"
	"backend/internal/domain/usecases/authUsecase"
	"backend/internal/domain/usecases/userUsecase"
	httpServer "backend/internal/httpServer/v1"
	"backend/internal/repositories/userStorage"
	"backend/pkg/database/postgres"
	"backend/pkg/logger"
	"fmt"
	"github.com/spf13/cobra"
	"go.uber.org/dig"
)

var serverCmd = cobra.Command{
	Use: "server",
	Run: func(cmd *cobra.Command, args []string) {
		boostrap()
	},
}

func boostrap() {
	var err error
	c := dig.New()

	fmt.Println("parse config")
	err = c.Provide(config.NewConfig)
	if err != nil {
		panic(err)
	}

	fmt.Println("create logger")
	err = c.Provide(logger.NewDev)
	if err != nil {
		panic(err)
	}

	// db
	fmt.Println("connect to postgres")
	err = c.Provide(func(log logger.Logger, conf *config.Config) (postgres.Client, error) {
		return postgres.NewPostgresClient(log, conf.POSTGRESQL_URL)
	})
	if err != nil {
		panic(err)
	}

	fmt.Println("create user storage")
	err = c.Provide(userStorage.NewUserStorage, dig.As(new(userService.Repository)))
	if err != nil {
		panic(err)
	}

	// services
	fmt.Println("create user service")
	err = c.Provide(userService.NewUserService, dig.As(new(userUsecase.UserService), new(authUsecase.UserService)))
	if err != nil {
		panic(err)
	}

	// usecases
	fmt.Println("create user usecase")
	err = c.Provide(userUsecase.NewUserUsecase, dig.As(new(httpServer.UserUsecase)))
	if err != nil {
		panic(err)
	}

	fmt.Println("create auth usecase")
	err = c.Provide(authUsecase.NewAuthUsecase, dig.As(new(httpServer.AuthUsecase)))
	if err != nil {
		panic(err)
	}

	// server
	fmt.Println("create server")
	err = c.Provide(httpServer.NewServer)
	if err != nil {
		panic(err)
	}

	fmt.Println("start server")
	err = c.Invoke(func(server httpServer.Server) error {
		return server.Run()
	})
	if err != nil {
		panic(err)
	}
}

func init() {
	rootCmd.AddCommand(&serverCmd)
}
