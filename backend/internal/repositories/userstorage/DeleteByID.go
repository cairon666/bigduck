package userstorage

import (
	"context"

	"backend/internal/exceptions"
	"backend/pkg/logger"
	"backend/pkg/tracing"
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
