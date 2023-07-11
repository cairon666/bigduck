package userstorage

import (
	"context"

	"backend/internal/exceptions"
	"backend/pkg/logger"
	"backend/pkg/tracing"
	"github.com/Masterminds/squirrel"
	"github.com/google/uuid"
)

var possibleFieldsUpdateCredential = []string{
	"password_hash",
	"salt",
}

func (s *Storage) UpdateCredentialByID(ctx context.Context, id uuid.UUID, data map[string]any) error {
	ctx, span := tracing.Start(ctx, "userstorage.UpdateCredentialByID")
	defer span.End()

	b := s.qb.
		Update("public.credentials").
		Where(squirrel.Eq{"id_user": id})

	for _, key := range possibleFieldsUpdateCredential {
		if value, ok := data[key]; ok {
			b = b.Set(key, value)
		}
	}

	query, args, err := b.ToSql()
	if err != nil {
		s.log.Error("UpdateCredentialByID ToSql", logger.Error(err))
		return err
	}

	cmd, err := s.client.Exec(ctx, query, args...)
	if err != nil {
		s.log.Error("UpdateCredentialByID Exec", logger.Error(err))
		return err
	}

	if cmd.RowsAffected() == 0 {
		return exceptions.ErrNotFound
	}

	return nil
}
