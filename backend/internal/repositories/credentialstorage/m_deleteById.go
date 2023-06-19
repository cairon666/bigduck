package credentialstorage

import (
	"context"

	"backend/pkg/tracing"
)

func (s *storage) DeleteByID(ctx context.Context, id string) error {
	ctx, span := tracing.Start(ctx, "credentialstorage.DeleteByID")
	defer span.End()

	query := "delete from public.credentials where id = $1"

	if _, err := s.client.Exec(ctx, query, id); err != nil {
		return err
	}

	return nil
}
