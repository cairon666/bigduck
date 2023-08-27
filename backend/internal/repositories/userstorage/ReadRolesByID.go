package userstorage

import (
	"context"

	"backend/internal/domain/models"
	"backend/pkg/logger"
	"backend/pkg/tracing"
	"github.com/Masterminds/squirrel"
	"github.com/google/uuid"
)

func (s *Storage) ReadRolesByID(ctx context.Context, id uuid.UUID) (models.Roles, error) {
	ctx, span := tracing.Start(ctx, "userstorage.ReadRolesByID")
	defer span.End()

	query, args, err := s.qb.
		Select("id_role").
		From("public.user_roles").
		Where(squirrel.Eq{"id_user": id}).
		ToSql()
	if err != nil {
		s.log.Error("ReadRolesByID ToSql", logger.Error(err))
		return models.Roles{}, err
	}

	rows, err := s.client.Query(ctx, query, args...)
	if err != nil {
		s.log.Error("ReadRolesByID Query", logger.Error(err))
		return models.Roles{}, err
	}
	defer rows.Close()

	roles := models.Roles{}

	for rows.Next() {
		var role models.RoleID

		if err := rows.Scan(&role); err != nil {
			s.log.Error("ReadRolesByID Scan", logger.Error(err))
			return models.Roles{}, err
		}

		roles = append(roles, role)
	}

	return roles, nil
}
