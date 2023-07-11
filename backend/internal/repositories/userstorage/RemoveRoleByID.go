package userstorage

import (
	"context"

	"backend/internal/domain/models"
	"backend/internal/exceptions"
	"backend/pkg/logger"
	"backend/pkg/tracing"
	"github.com/Masterminds/squirrel"
	"github.com/google/uuid"
)

func (s *Storage) RemoveRoleByID(ctx context.Context, id uuid.UUID, roleID models.RoleID) error {
	ctx, span := tracing.Start(ctx, "userstorage.RemoveRoleByID")
	defer span.End()

	query, args, err := s.qb.
		Delete("public.user_roles").
		Where(squirrel.Eq{
			"id_user": id,
			"id_role": roleID,
		}).
		ToSql()
	if err != nil {
		s.log.Error("RemoveRoleByID ToSql", logger.Error(err))
		return err
	}

	res, err := s.client.Exec(ctx, query, args...)
	if err != nil {
		s.log.Error("RemoveRoleByID Exec", logger.Error(err))
		return err
	}

	if res.RowsAffected() == 0 {
		return exceptions.ErrNotFound
	}

	return nil
}
