package credentialstorage

import "context"

func (s *storage) DeleteByID(ctx context.Context, id string) error {
	query := "delete from public.credentials where id = $1"

	if _, err := s.client.Exec(ctx, query, id); err != nil {
		return err
	}

	return nil
}
