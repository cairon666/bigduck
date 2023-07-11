package userstorage

import (
	"context"

	"backend/internal/domain/models"
	"backend/internal/exceptions"
	"backend/pkg/filter"
	"backend/pkg/logger"
	"backend/pkg/tracing"
)

func (s *Storage) ReadOneUser(ctx context.Context, filter filter.Filter) (models.User, error) {
	ctx, span := tracing.Start(ctx, "userstorage.ReadOneUser")
	defer span.End()

	b := s.qb.Select(
		"users.id",
		"users.email",
		"users.is_confirm",
		"users.username",
	).
		From("public.users users")

	query, args, err := filter.AttachToSelect(b).ToSql()
	if err != nil {
		s.log.Error("ReadOneUser ToSql", logger.Error(err))

		return models.User{}, err
	}

	rows, err := s.client.Query(ctx, query, args...)
	if err != nil {
		s.log.Error("ReadOneUser Query", logger.Error(err))

		return models.User{}, err
	}
	defer rows.Close()

	if !rows.Next() {
		return models.User{}, exceptions.ErrNotFound
	}

	user := models.User{}

	if err := rows.Scan(&user.ID, &user.Email, &user.IsConfirm, &user.UserName); err != nil {
		s.log.Error("ReadOneUser Scan", logger.Error(err))

		return models.User{}, err
	}

	return user, nil
}
