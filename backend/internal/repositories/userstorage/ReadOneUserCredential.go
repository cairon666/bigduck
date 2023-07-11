package userstorage

import (
	"context"

	"backend/internal/domain/aggregate"
	"backend/internal/exceptions"
	"backend/pkg/filter"
	"backend/pkg/logger"
	"backend/pkg/tracing"
)

func (s *Storage) ReadOneUserCredential(ctx context.Context, filter filter.Filter) (aggregate.UserCredential, error) {
	ctx, span := tracing.Start(ctx, "userstorage.ReadOneUserCredential")
	defer span.End()

	b := s.qb.Select(
		"users.id",
		"users.email",
		"users.is_confirm",
		"users.username",
		"credentials.password_hash",
		"credentials.salt",
	).
		From("public.users users").
		Join("public.credentials credentials on credentials.id_user = users.id").
		Limit(1)

	query, args, err := filter.AttachToSelect(b).ToSql()
	if err != nil {
		s.log.Error("ReadOneUserCredential ToSql", logger.Error(err))

		return aggregate.UserCredential{}, err
	}

	rows, err := s.client.Query(ctx, query, args...)
	if err != nil {
		s.log.Error("ReadOneUserCredential Query", logger.Error(err))

		return aggregate.UserCredential{}, err
	}
	defer rows.Close()

	if !rows.Next() {
		return aggregate.UserCredential{}, exceptions.ErrNotFound
	}

	user := aggregate.UserCredential{}

	if err := rows.Scan(
		&user.User.ID,
		&user.User.Email,
		&user.User.IsConfirm,
		&user.User.UserName,
		&user.Credential.PasswordHash,
		&user.Credential.Salt,
	); err != nil {
		s.log.Error("ReadOneUserCredential Scan", logger.Error(err))

		return aggregate.UserCredential{}, err
	}

	// fill user_id
	user.Credential.IDUser = user.User.ID

	return user, nil
}
