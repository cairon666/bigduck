package credentialstorage

import (
	"context"
	"errors"

	"backend/internal/domain/exceptions"
	"backend/internal/domain/models"
	"backend/pkg/qb"
	"backend/pkg/tracing"
	"github.com/jackc/pgx/v5/pgconn"
)

func (s *storage) Create(ctx context.Context, credentials models.Credential) error {
	ctx, span := tracing.Start(ctx, "credentialstorage.Create")
	defer span.End()

	query, args := qb.
		Insert("public.credentials",
			"id",
			"email",
			"email_is_confirm",
			"password_hash",
			"salt",
		).
		Values(
			credentials.ID,
			credentials.Email,
			credentials.EmailIsConfirm,
			credentials.PasswordHash,
			credentials.Salt,
		).
		ToSQL()

	_, err := s.client.Exec(ctx, query, args...)
	if err != nil {
		if pgErr := new(pgconn.PgError); errors.As(err, &pgErr) {
			switch pgErr.ConstraintName {
			case "credentials_email_uniq":
				return exceptions.ErrEmailAlreadyExist
			default:
				return err
			}
		}
	}

	return nil
}
