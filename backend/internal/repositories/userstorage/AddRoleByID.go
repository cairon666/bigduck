package userstorage

import (
	"context"
	"errors"

	"backend/internal/domain/models"
	"backend/internal/exceptions"
	"backend/pkg/logger"
	"backend/pkg/tracing"
	"github.com/jackc/pgx/v5/pgconn"
)

func (s *Storage) AddRoleByID(ctx context.Context, id string, role models.RoleID) error {
	ctx, span := tracing.Start(ctx, "userstorage.AddRoleByID")
	defer span.End()

	query, args, err := s.qb.Insert("public.user_roles").
		Columns("id_user", "id_role").
		Values(id, role).
		ToSql()
	if err != nil {
		s.log.Error("to sql error", logger.Error(err))

		return err
	}

	if _, err = s.client.Exec(ctx, query, args...); err != nil {
		if pgErr := new(pgconn.PgError); errors.As(err, &pgErr) {
			switch pgErr.ConstraintName {
			case "user_roles_id_user_fk":
				return exceptions.ErrIDUserForeignKey
			case "user_roles_id_role_fk":
				return exceptions.ErrIDRoleForeignKey
			case "user_roles_unique":
				return exceptions.ErrRoleAlreadyExist
			}
		}

		s.log.Error("exec add role by id", logger.Error(err))

		return err
	}

	return nil
}
