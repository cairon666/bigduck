package userstorage

import (
	"context"
	"errors"

	"backend/internal/domain/models"
	"backend/internal/exceptions"
	"backend/pkg/qb"
	"backend/pkg/tracing"
	"github.com/jackc/pgx/v5/pgconn"
)

func (s *UserStorage) Create(ctx context.Context, user models.User) error {
	ctx, span := tracing.Start(ctx, "userstorage.Create")
	defer span.End()

	query, args := qb.Insert(
		"public.users",
		"id",
		"email",
		"email_is_confirm",
		"password_hash",
		"salt",
		"first_name",
		"second_name",
		"user_name",
		"day_of_birth",
		"avatar_url",
		"gender",
		"create_at").
		Values(
			user.ID,
			user.Email,
			user.EmailIsConfirm,
			user.PasswordHash,
			user.Salt,
			user.FirstName,
			user.SecondName,
			user.UserName,
			user.DateOfBirth,
			user.AvatarURL,
			user.Gender,
			user.CreateAt,
		).
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

		return exceptions.NewInternalErr("userstorage.Create.Exec", err)
	}

	return nil
}
