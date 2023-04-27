package userstorage

import (
	"context"
	"errors"
	"testing"

	"backend/internal/config"
	"backend/internal/exceptions"
	"backend/pkg/database/postgres"
	"github.com/google/uuid"
)

func Bootstrap(t *testing.T) *UserStorage {
	t.Helper()

	conf, _ := config.NewConfig()

	client, err := postgres.NewPostgresClient(conf.Postgres)
	if err != nil {
		t.Fatal(err)
	}

	return NewUserStorage(client)
}

func TestReadOne(t *testing.T) {
	t.Parallel()

	ctx := context.Background()
	storage := Bootstrap(t)

	t.Run("should success", func(t *testing.T) {
		t.Parallel()

		_, err := storage.ReadOne(ctx, map[string]any{
			"id": "a4158df8-d36a-11ed-8cdc-2887ba94adbb",
		})
		if err != nil {
			t.Fatal("should success read: " + err.Error())
		}
	})

	t.Run("should error: not found", func(t *testing.T) {
		t.Parallel()

		_, err := storage.ReadOne(ctx, map[string]any{
			"id": uuid.Must(uuid.NewUUID()),
		})
		if !errors.Is(err, exceptions.ErrNotFound) {
			t.Fatal("should be exceptions.ErrNotFound: " + err.Error())
		}
	})
}
