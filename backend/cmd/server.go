package cmd

import (
	"authService/internal/adapters/registerStorage"
	"authService/internal/adapters/userStorage"
	"authService/internal/config"
	"authService/internal/domain/services/register"
	"authService/internal/domain/services/user"
	"authService/internal/domain/usecases/authentication"
	"authService/internal/http"
	"authService/pkg/database/postgres"
	"authService/pkg/logger"
	"fmt"
	"github.com/spf13/cobra"
	"go.uber.org/dig"
)

func init() {
	rootCmd.AddCommand(&serverCmd)
}

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
		err = c.Provide(func(conf *config.Config, log logger.Logger) (postgres.Client, error) {
			return postgres.NewPostgresClient(log, conf.POSTGRESQL_URL)
		})
		if err != nil {
			panic(err)
		}

		// adapters
		err = c.Provide(func(log logger.Logger) register.Repository {
			return registerStorage.NewRegisterStorage(log)
		})
		if err != nil {
			panic(err)
		}

		err = c.Provide(func(pgClient postgres.Client) user.Repository {
			return userStorage.NewUserStorage(pgClient)
		})
		if err != nil {
			panic(err)
		}

		// services
		err = c.Provide(func(regsiterStorage register.Repository) authentication.RegisterService {
			return register.NewRegisterService(regsiterStorage)
		})
		if err != nil {
			panic(err)
		}

		err = c.Provide(func(userStorage user.Repository) authentication.UserService {
			return user.NewUserService(userStorage)
		})
		if err != nil {
			panic(err)
		}

		// usecases
		err = c.Provide(authentication.NewAuthUsecase)
		if err != nil {
			panic(err)
		}

		// server
		err = c.Provide(http.NewServer)
		if err != nil {
			panic(err)
		}

		err = c.Invoke(func(server http.Server) error {
			fmt.Println("start server!")
			return server.Run()
		})
		if err != nil {
			panic(err)
		}
	},
}
