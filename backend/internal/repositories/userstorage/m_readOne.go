package userstorage

import (
	"context"

	"backend/internal/domain/models"
	"backend/internal/exceptions"
	"backend/pkg/qb"
	"backend/pkg/tracing"
	"github.com/jackc/pgx/v5"
)

func (s *UserStorage) ReadOne(ctx context.Context, filter map[string]any) (models.User, error) {
	ctx, span := tracing.Start(ctx, "userstorage.ReadOne")
	defer span.End()

	builder := qb.Select(
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
		"create_at",
	).
		From("public.users")

	for key, value := range filter {
		builder = builder.AndWhere(qb.Eql(key, value))
	}

	query, args := builder.ToSQL()

	rows, err := s.client.Query(ctx, query, args...)
	if err != nil {
		return models.User{}, exceptions.NewInternalErr("userstorage.ReadOne.Query", err)
	}
	defer rows.Close()

	if !rows.Next() {
		return models.User{}, exceptions.ErrNotFound
	}

	dbUser, err := pgx.RowToStructByPos[DBUser](rows)
	if err != nil {
		return models.User{}, exceptions.NewInternalErr("userstorage.ReadOne.RowToStructByPos", err)
	}

	return dbUser.ToModelUser(), nil
}
