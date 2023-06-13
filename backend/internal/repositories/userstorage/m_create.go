package userstorage

import (
	"context"
	"errors"

	"backend/internal/domain/exceptions"
	"backend/internal/domain/models"
	"backend/pkg/qb"
	"github.com/jackc/pgx/v5/pgconn"
	errors2 "github.com/pkg/errors"
)

func (s *UserStorage) Create(ctx context.Context, user models.User) error {
	query, args := qb.Insert(
		"public.users",
		"id",
		"email",
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
				return exceptions.ErrEmailAlreadyExist
			default:
				return errors2.Wrap(err, "userstorage.Create")
			}
		}
	}

	return nil
}
