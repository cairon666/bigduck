package userstorage

import (
	"context"

	"backend/internal/exceptions"
	"backend/pkg/logger"
	"backend/pkg/tracing"
	"github.com/Masterminds/squirrel"
	"github.com/google/uuid"
)

var possibleFieldsUpdateProfile = []string{
	"first_name",
	"second_name",
	"gender",
	"day_of_birth",
	"avatar_url",
}

func (s *Storage) UpdateProfileByID(ctx context.Context, id uuid.UUID, data map[string]any) error {
	ctx, span := tracing.Start(ctx, "userstorage.UpdateProfileByID")
	defer span.End()

	b := s.qb.Update("public.profiles").Where(squirrel.Eq{"id_user": id})

	for _, key := range possibleFieldsUpdateProfile {
		if value, ok := data[key]; ok {
			b = b.Set(key, value)
		}
	}

	query, args, err := b.ToSql()
	if err != nil {
		s.log.Error("UpdateProfileByID ToSql", logger.Error(err))
		return err
	}

	res, err := s.client.Exec(ctx, query, args...)
	if err != nil {
		s.log.Error("UpdateProfileByID Exec", logger.Error(err))
		return err
	}

	if res.RowsAffected() == 0 {
		return exceptions.ErrNotFound
	}

	return nil
}
