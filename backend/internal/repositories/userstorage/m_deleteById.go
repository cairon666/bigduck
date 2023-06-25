package userstorage

import (
	"context"

	"backend/internal/exceptions"
	"backend/pkg/tracing"
)

func (s *UserStorage) DeleteByID(ctx context.Context, id string) error {
	ctx, span := tracing.Start(ctx, "userstorage.DeleteByID")
	defer span.End()

	query := "delete from public.users where id = $1"

	if _, err := s.client.Exec(ctx, query, id); err != nil {
		return exceptions.NewInternalErr("userstorage.DeleteByID.Exec", err)
	}

	return nil
}
