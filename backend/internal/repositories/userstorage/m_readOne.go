package userstorage

import (
	"context"

	"backend/internal/domain/exceptions"
	"backend/internal/domain/models"
	"backend/pkg/qb"
	"github.com/pkg/errors"
)

var possibleFilterKeys = []string{
	"id",
	"email",
}

func (s *UserStorage) ReadOne(ctx context.Context, filter map[string]any) (models.User, error) {
	builder := qb.Select(
		"id",
		"email",
		"first_name",
		"second_name",
		"user_name",
		"day_of_birth",
		"avatar_url",
		"gender",
		"create_at",
	).
		From("public.users")

	for _, key := range possibleFilterKeys {
		if value, ok := filter[key]; ok {
			builder = builder.AndWhere(qb.Eql(key, value))
		}
	}

	query, args := builder.ToSQL()

	rows, err := s.client.Query(ctx, query, args...)
	if err != nil {
		return models.User{}, errors.Wrap(err, "userstorage.ReadOne.Query")
	}
	defer rows.Close()

	if !rows.Next() {
		return models.User{}, exceptions.ErrNotFound
	}

	var user models.User
	if err := rows.Scan(
		&user.ID,
		&user.Email,
		&user.FirstName,
		&user.SecondName,
		&user.UserName,
		&user.DateOfBirth,
		&user.AvatarURL,
		&user.Gender,
		&user.CreateAt,
	); err != nil {
		return models.User{}, errors.Wrap(err, "userstorage.ReadOne.Scan")
	}

	return user, nil
}
