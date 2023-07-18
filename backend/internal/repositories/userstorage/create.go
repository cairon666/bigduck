package userstorage

import (
	"context"
	"errors"

	"backend/internal/domain/aggregate"
	"backend/pkg/logger"
	"backend/pkg/tracing"
	"github.com/jackc/pgx/v5"
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

	if err := tx.Commit(ctx); err != nil {
		return err
	}

	return nil
}
