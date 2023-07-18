package userstorage

import (
	"context"
	"errors"

	"backend/internal/domain/models"
	"backend/internal/exceptions"
	"backend/pkg/logger"
	"backend/pkg/tracing"
	"github.com/Masterminds/squirrel"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
)

func (s *Storage) DeleteByID(ctx context.Context, id string) error {
	ctx, span := tracing.Start(ctx, "userstorage.DeleteByID")
	defer span.End()

	query := "delete from public.users where id = $1"

	res, err := s.client.Exec(ctx, query, id)
	if err != nil {
		s.log.Error("delete by id exec", logger.Error(err))
		return err
	}

	if res.RowsAffected() == 0 {
		return exceptions.ErrNotFound
	}

	return nil
}

func (s *Storage) UpdateUserByID(ctx context.Context, id uuid.UUID, data map[string]any) error {
	ctx, span := tracing.Start(ctx, "userstorage.UpdateUserByID")
	defer span.End()

	b := s.qb.Update("public.users").Where(squirrel.Eq{"id": id})

	for key, value := range data {
		b = b.Set(key, value)
	}

	query, args, err := b.ToSql()
	if err != nil {
		s.log.Error("UpdateUserByID ToSql", logger.Error(err))
		return err
	}

	res, err := s.client.Exec(ctx, query, args...)
	if err != nil {
		if pgErr := parseUsersPgError(err); pgErr != nil {
			return pgErr
		}

		s.log.Error("UpdateUserByID Exec", logger.Error(err))
		return err
	}

	if res.RowsAffected() == 0 {
		return exceptions.ErrNotFound
	}

	return nil
}

func (s *Storage) createUser(ctx context.Context, tx pgx.Tx, user models.User) error {
	query, args, err := s.qb.
		Insert("public.users").
		Columns(
			"id",
			"email",
			"is_confirm",
			"username",
		).
		Values(
			user.ID,
			user.Email,
			user.IsConfirm,
			user.UserName,
		).
		ToSql()
	if err != nil {
		s.log.Error("create user toSQL", logger.Error(err))
		return err
	}

	_, err = tx.Exec(ctx, query, args...)
	if err != nil {
		if pgErr := parseUsersPgError(err); pgErr != nil {
			return pgErr
		}

		s.log.Error("create user exec", logger.Error(err))
		return err
	}

	return nil
}

func parseUsersPgError(err error) error {
	if pgErr := new(pgconn.PgError); errors.As(err, &pgErr) {
		switch pgErr.ConstraintName {
		case usersIDUniq:
			return exceptions.ErrIDAlreadyExist
		case usersEmailUniq:
			return exceptions.ErrEmailAlreadyExist
		case usersUsernameUniq:
			return exceptions.ErrUserNameAlreadyExist
		}
	}

	return nil
}
