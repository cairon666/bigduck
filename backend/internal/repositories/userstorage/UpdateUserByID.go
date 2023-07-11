package userstorage

import (
	"context"
	"errors"

	"backend/internal/exceptions"
	"backend/pkg/logger"
	"backend/pkg/tracing"
	"github.com/Masterminds/squirrel"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgconn"
)

var possibleFieldsUpdateUser = []string{
	"email",
	"is_confirm",
	"username",
}

func (s *Storage) UpdateUserByID(ctx context.Context, id uuid.UUID, data map[string]any) error {
	ctx, span := tracing.Start(ctx, "userstorage.UpdateUserByID")
	defer span.End()

	b := s.qb.Update("public.users").Where(squirrel.Eq{"id": id})

	for _, key := range possibleFieldsUpdateUser {
		if value, ok := data[key]; ok {
			b = b.Set(key, value)
		}
	}

	query, args, err := b.ToSql()
	if err != nil {
		s.log.Error("UpdateUserByID ToSql", logger.Error(err))
		return err
	}

	res, err := s.client.Exec(ctx, query, args...)
	if err != nil {
		if pgErr := new(pgconn.PgError); errors.As(err, &pgErr) {
			switch pgErr.ConstraintName {
			case "users_email_uniq":
				return exceptions.ErrEmailAlreadyExist
			case "users_username_uniq":
				return exceptions.ErrUserNameAlreadyExist
			}
		}

		s.log.Error("UpdateUserByID Exec", logger.Error(err))

		return err
	}

	if res.RowsAffected() == 0 {
		return exceptions.ErrNotFound
	}

	return nil
}
