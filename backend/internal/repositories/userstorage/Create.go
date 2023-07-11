package userstorage

import (
	"context"
	"errors"

	"backend/internal/domain/aggregate"
	"backend/internal/domain/models"
	"backend/internal/exceptions"
	"backend/pkg/logger"
	"backend/pkg/tracing"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
)

func (s *Storage) Create(ctx context.Context, user aggregate.UserFull) error {
	ctx, span := tracing.Start(ctx, "userstorage.Create")
	defer span.End()

	tx, err := s.client.Begin(ctx)
	if err != nil {
		s.log.Error("create user begin", logger.Error(err))

		return err
	}

	defer func() {
		if err := tx.Rollback(ctx); !errors.Is(err, pgx.ErrTxClosed) {
			s.log.Error("create user rollback", logger.Error(err))
		}
	}()

	if err := s.createUser(ctx, tx, user.User); err != nil {
		return err
	}

	if err := s.createCredential(ctx, tx, user.Credential); err != nil {
		return err
	}

	if err := s.createProfile(ctx, tx, user.Profile); err != nil {
		return err
	}

	if err := s.createRoles(ctx, tx, user.User.ID, user.Roles); err != nil {
		return err
	}

	return tx.Commit(ctx)
}

func (s *Storage) createUser(ctx context.Context, tx pgx.Tx, user models.User) error {
	query, args, err := s.qb.Insert("public.users").
		Columns("id", "email", "is_confirm", "username").
		Values(user.ID, user.Email, user.IsConfirm, user.UserName).
		ToSql()
	if err != nil {
		s.log.Error("create user toSQL", logger.Error(err))

		return err
	}

	_, err = tx.Exec(ctx, query, args...)
	if err != nil {
		if pgErr := new(pgconn.PgError); errors.As(err, &pgErr) {
			switch pgErr.ConstraintName {
			case "users_id_uniq":
				return exceptions.ErrIDAlreadyExist
			case "users_email_uniq":
				return exceptions.ErrEmailAlreadyExist
			case "users_username_uniq":
				return exceptions.ErrUserNameAlreadyExist
			}
		}

		s.log.Error("create user exec", logger.Error(err))

		return err
	}

	return nil
}

func (s *Storage) createCredential(ctx context.Context, tx pgx.Tx, credential models.Credential) error {
	query, args, err := s.qb.Insert("public.credentials").
		Columns("id_user", "password_hash", "salt").
		Values(credential.IDUser, credential.PasswordHash, credential.Salt).
		ToSql()
	if err != nil {
		s.log.Error("create credential ToSqk", logger.Error(err))

		return err
	}

	_, err = tx.Exec(ctx, query, args...)
	if err != nil {
		if pgErr := new(pgconn.PgError); errors.As(err, &pgErr) {
			if pgErr.ConstraintName == "credentials_id_user_fk" {
				return exceptions.ErrIDUserForeignKey
			}
		}

		s.log.Error("create credential exec", logger.Error(err))

		return err
	}

	return nil
}

func (s *Storage) createProfile(ctx context.Context, tx pgx.Tx, profile models.Profile) error {
	query, args, err := s.qb.
		Insert("public.profiles").
		Columns(
			"id_user",
			"first_name",
			"second_name",
			"gender",
			"day_of_birth",
			"avatar_url",
			"create_at").
		Values(
			profile.IDUser,
			profile.FirstName,
			profile.SecondName,
			profile.Gender,
			profile.DateOfBirth,
			profile.AvatarURL,
			profile.CreateAt).
		ToSql()
	if err != nil {
		s.log.Error("create profile ToSql", logger.Error(err))

		return err
	}

	_, err = tx.Exec(ctx, query, args...)
	if err != nil {
		if pgErr := new(pgconn.PgError); errors.As(err, &pgErr) {
			if pgErr.ConstraintName == "profiles_id_user_fk" {
				return exceptions.ErrIDUserForeignKey
			}
		}

		s.log.Error("create profile exec", logger.Error(err))

		return err
	}

	return nil
}

func (s *Storage) createRoles(ctx context.Context, tx pgx.Tx, idUser uuid.UUID, roles models.Roles) error {
	if len(roles) == 0 {
		return nil
	}

	b := s.qb.Insert("public.user_roles").
		Columns("id_user", "id_role")

	for _, role := range roles {
		b = b.Values(idUser, role)
	}

	query, args, err := b.ToSql()
	if err != nil {
		s.log.Error("create roles ToSql", logger.Error(err))
		return err
	}

	_, err = tx.Exec(ctx, query, args...)
	if err != nil {
		if pgErr := new(pgconn.PgError); errors.As(err, &pgErr) {
			switch pgErr.ConstraintName {
			case "profiles_id_user_fk":
				return exceptions.ErrIDUserForeignKey
			case "user_roles_id_fk":
				return exceptions.ErrIDRoleForeignKey
			}
		}

		s.log.Error("create roles exec", logger.Error(err))

		return err
	}

	return nil
}
