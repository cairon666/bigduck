package userstorage

import (
	"context"

	"backend/internal/exceptions"
	"backend/pkg/qb"
	"backend/pkg/tracing"
	"github.com/jackc/pgx/v5/pgconn"
	"github.com/pkg/errors"
)

func (s *UserStorage) UpdateByID(ctx context.Context, id string, data map[string]any) error {
	ctx, span := tracing.Start(ctx, "userstorage.UpdateByID")
	defer span.End()

	builder := qb.Update("public.users")

	for key, value := range data {
		builder = builder.Set(qb.Eql(key, value))
	}

	query, args := builder.
		AndWhere(qb.Eql("id", id)).
		ToSQL()

	_, err := s.client.Exec(ctx, query, args...)
	if err != nil {
		if pgErr := new(pgconn.PgError); errors.As(err, &pgErr) {
			switch pgErr.ConstraintName {
			case "users_user_name_uniq":
				return exceptions.ErrUsernameAlreadyExist
			case "users_email_uniq":
				return exceptions.ErrEmailAlreadyExist
			}
		}

		return exceptions.NewInternalErr("userstorage.UpdateByID.Exec", err)
	}

	return nil
}
