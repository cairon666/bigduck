package userstorage

import (
	"context"
	"errors"

	"backend/internal/domain/models"
	"backend/internal/exceptions"
	"backend/pkg/logger"
	"backend/pkg/tracing"
	"github.com/Masterminds/squirrel"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
)

func (s *Storage) AddRolesByID(ctx context.Context, id uuid.UUID, roles models.Roles) error {
	ctx, span := tracing.Start(ctx, "userstorage.AddRolesByID")
	defer span.End()

	b := s.qb.Insert("public.user_roles").
		Columns("id_user", "id_role")

	for _, role := range roles {
		b = b.Values(id, role)
	}

	query, args, err := b.ToSql()
	if err != nil {
		s.log.Error("to sql error", logger.Error(err))
		return err
	}

	if _, err = s.client.Exec(ctx, query, args...); err != nil {
		if pgErr := parseUserRolesPgError(err); pgErr != nil {
			return pgErr
		}

		s.log.Error("exec add role by id", logger.Error(err))
		return err
	}

	return nil
}

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

func (s *Storage) createRoles(ctx context.Context, tx pgx.Tx, idUser uuid.UUID, roles models.Roles) error {
	if len(roles) == 0 {
		return nil
	}

	b := s.qb.
		Insert("public.user_roles").
		Columns("id_user", "id_role")

	for _, role := range roles {
		b = b.Values(idUser, role)
	}

	query, args, err := b.ToSql()
	if err != nil {
		s.log.Error("create roles ToSql", logger.Error(err))
		return err
	}

	if _, err = tx.Exec(ctx, query, args...); err != nil {
		if pgErr := parseUserRolesPgError(err); pgErr != nil {
			return pgErr
		}

		s.log.Error("create roles exec", logger.Error(err))
		return err
	}

	return nil
}

func parseUserRolesPgError(err error) error {
	if pgErr := new(pgconn.PgError); errors.As(err, &pgErr) {
		switch pgErr.ConstraintName {
		case userRolesIDUserFK:
			return exceptions.ErrIDUserForeignKey
		case userRolesIDRoleFK:
			return exceptions.ErrIDRoleForeignKey
		case userRolesUnique:
			return exceptions.ErrRoleAlreadyExist
		}
	}

	return nil
}
