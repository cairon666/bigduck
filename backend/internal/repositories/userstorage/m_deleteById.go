package userstorage

import (
	"context"

	"github.com/pkg/errors"
)

func (s *UserStorage) DeleteByID(ctx context.Context, id string) error {
	query := "delete from public.users where id = $1"

	if _, err := s.client.Exec(ctx, query, id); err != nil {
		return errors.Wrap(err, "userstorage.DeleteByID")
	}

	return nil
}
