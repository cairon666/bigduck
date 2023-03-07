package userStorage

import (
	"authService/internal/config"
	"authService/internal/domain/models"
	"authService/pkg/database/postgres"
	"authService/pkg/logger"
	"context"
	"github.com/google/uuid"
	"testing"
	"time"
)

func TestNewUserStorage(t *testing.T) {
	log, err := logger.NewDev()
	if err != nil {
		t.Fatal(err)
	}
	conf, err := config.NewConfig()
	if err != nil {
		t.Fatal(err)
	}
	client, err := postgres.NewPostgresClient(log, conf.POSTGRESQL_URL)
	if err != nil {
		t.Fatal(err)
	}
	userStorage := NewUserStorage(client)
	ctx := context.Background()

	t.Run("user storage", func(t *testing.T) {
		t.Run("should success create", func(t *testing.T) {
			user := models.User{
				IdUser:       uuid.New().String(),
				Email:        uuid.New().String(),
				PasswordHash: "test_user_storage",
				Salt:         "test_user_storage",
				FirstName:    "test_user_storage",
				SecondName:   "test_user_storage",
				DateOfBirth:  nil,
				Gender:       nil,
				DateCreate:   time.Now(),
				DateModify:   time.Now(),
			}
			err := userStorage.Create(ctx, user)
			if err != nil {
				t.Fatal(err)
			}

			t.Run("should success find by id", func(t *testing.T) {
				_, err := userStorage.GetById(ctx, user.IdUser)
				if err != nil {
					t.Fatal(err)
				}
			})

			t.Run("should success find by email", func(t *testing.T) {
				_, err := userStorage.GetById(ctx, user.Email)
				if err != nil {
					t.Fatal(err)
				}
			})
		})
	})
}
