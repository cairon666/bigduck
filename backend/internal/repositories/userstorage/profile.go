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

func (s *Storage) UpdateProfileByID(ctx context.Context, id uuid.UUID, data map[string]any) error {
	ctx, span := tracing.Start(ctx, "userstorage.UpdateProfileByID")
	defer span.End()

	b := s.qb.Update("public.profiles").Where(squirrel.Eq{"id_user": id})

	for key, value := range data {
		b = b.Set(key, value)
	}

	query, args, err := b.ToSql()
	if err != nil {
		s.log.Error("UpdateProfileByID ToSql", logger.Error(err))
		return err
	}

	res, err := s.client.Exec(ctx, query, args...)
	if err != nil {
		if pgErr := parseProfilePgError(err); pgErr != nil {
			return pgErr
		}

		s.log.Error("UpdateProfileByID Exec", logger.Error(err))
		return err
	}

	if res.RowsAffected() == 0 {
		return exceptions.ErrNotFound
	}

	return nil
}

func (s *Storage) createProfile(ctx context.Context, tx pgx.Tx, profile models.Profile) error {
	query, args, err := s.qb.
		Insert("public.profiles").
		Columns(
			"id_user",
			"first_name",
			"second_name",
			"gender",
			"day_of_birth",
			"avatar_url",
			"create_at").
		Values(
			profile.IDUser,
			profile.FirstName,
			profile.SecondName,
			profile.Gender,
			profile.DateOfBirth,
			profile.AvatarURL,
			profile.CreateAt).
		ToSql()
	if err != nil {
		s.log.Error("create profile ToSql", logger.Error(err))
		return err
	}

	_, err = tx.Exec(ctx, query, args...)
	if err != nil {
		if pgErr := parseProfilePgError(err); pgErr != nil {
			return pgErr
		}

		s.log.Error("create profile exec", logger.Error(err))
		return err
	}

	return nil
}

func parseProfilePgError(err error) error {
	if pgErr := new(pgconn.PgError); errors.As(err, &pgErr) {
		if pgErr.ConstraintName == profilesIDUserFK {
			return exceptions.ErrIDUserForeignKey
		}
	}

	return nil
}
