package userstorage

import (
	"context"
	"errors"
	"testing"
	"time"

	"backend/internal/exceptions"
	"github.com/jackc/pgx/v5/pgconn"
	"github.com/pashagolub/pgxmock/v2"
)

func Bootstrap(t *testing.T) (context.Context, *UserStorage, pgxmock.PgxPoolIface) {
	t.Helper()

	mock, err := pgxmock.NewPool()
	if err != nil {
		t.Fatal(err)
	}

	return context.Background(), NewUserStorage(mock), mock
}

func TestUserStorage_ReadOne(t *testing.T) {
	t.Parallel()

	t.Run("should success", func(t *testing.T) {
		t.Parallel()
		ctx, storage, mock := Bootstrap(t)
		defer mock.Close()

		mock.ExpectQuery("SELECT").
			WithArgs("").
			WillReturnRows(pgxmock.NewRows([]string{
				"id",
				"email",
				"email_is_confirm",
				"password_hash",
				"salt",
				"first_name",
				"second_name",
				"avatar_url",
				"day_of_birth",
				"gender",
				"create_at",
				"modify_at",
			}).
				AddRow("", "", true, "", "", "", "", nil, nil, nil, time.Now(), time.Now()).
				AddCommandTag(pgconn.NewCommandTag("SELECT 1")),
			)

		_, err := storage.ReadOne(ctx, map[string]any{
			"id": "",
		})
		if err != nil {
			t.Fatal(err)
		}
	})

	t.Run("should except not found err", func(t *testing.T) {
		t.Parallel()
		ctx, storage, mock := Bootstrap(t)
		defer mock.Close()

		mock.ExpectQuery("SELECT").
			WithArgs("").
			WillReturnRows(
				pgxmock.NewRows([]string{}).
					AddCommandTag(pgconn.NewCommandTag("SELECT 0")),
			)

		_, err := storage.ReadOne(ctx, map[string]any{
			"id": "",
		})
		if !errors.Is(err, exceptions.ErrNotFound) {
			t.Fatal(err)
		}
	})
}
