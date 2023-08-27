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

func (s *Storage) UpdateCredentialByID(ctx context.Context, id uuid.UUID, data map[string]any) error {
	ctx, span := tracing.Start(ctx, "userstorage.UpdateCredentialByID")
	defer span.End()

	b := s.qb.
		Update("public.credentials").
		Where(squirrel.Eq{"id_user": id})

	for key, value := range data {
		b = b.Set(key, value)
	}

	query, args, err := b.ToSql()
	if err != nil {
		s.log.Error("UpdateCredentialByID ToSql", logger.Error(err))
		return err
	}

	cmd, err := s.client.Exec(ctx, query, args...)
	if err != nil {
		if pgErr := parseCredentialPgError(err); pgErr != nil {
			return pgErr
		}

		s.log.Error("update credential exec", logger.Error(err))
		return err
	}

	if cmd.RowsAffected() == 0 {
		return exceptions.ErrNotFound
	}

	return nil
}

func (s *Storage) createCredential(ctx context.Context, tx pgx.Tx, credential models.Credential) error {
	query, args, err := s.qb.Insert("public.credentials").
		Columns("id_user", "password_hash", "salt").
		Values(credential.IDUser, credential.PasswordHash, credential.Salt).
		ToSql()
	if err != nil {
		s.log.Error("create credential ToSqk", logger.Error(err))
		return err
	}

	_, err = tx.Exec(ctx, query, args...)
	if err != nil {
		if pgErr := parseCredentialPgError(err); pgErr != nil {
			return pgErr
		}

		s.log.Error("create credential exec", logger.Error(err))
		return err
	}

	return nil
}

func parseCredentialPgError(err error) error {
	if pgErr := new(pgconn.PgError); errors.As(err, &pgErr) {
		if pgErr.ConstraintName == credentialsIDUserFK {
			return exceptions.ErrIDUserForeignKey
		}
	}

	return nil
}
