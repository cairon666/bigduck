package userstorage

import (
	"context"

	"backend/internal/domain/aggregate"
	"backend/internal/exceptions"
	"backend/pkg/filter"
	"backend/pkg/logger"
	"backend/pkg/tracing"
)

func (s *Storage) ReadOneUserFull(ctx context.Context, filter filter.Filter) (aggregate.UserFull, error) {
	ctx, span := tracing.Start(ctx, "userstorage.ReadOneUserFull")
	defer span.End()

	b := s.qb.Select(
		"users.id as id",
		"users.email as email",
		"users.is_confirm as is_confirm",
		"users.username as username",
		"profiles.first_name as first_name",
		"profiles.second_name as second_name",
		"profiles.gender as gender",
		"profiles.day_of_birth as day_of_birth",
		"profiles.avatar_url as avatar_url",
		"profiles.create_at as create_at",
		"credentials.password_hash as create_at",
		"credentials.salt as salt",
		"array_agg(user_roles.id_role) as roles",
	).
		From("public.users users").
		Join("public.credentials credentials on credentials.id_user = users.id").
		Join("public.profiles profiles on profiles.id_user = users.id").
		LeftJoin("public.user_roles user_roles on user_roles.id_user = users.id").
		GroupBy(
			"id",
			"email",
			"is_confirm",
			"username",
			"first_name",
			"second_name",
			"gender",
			"day_of_birth",
			"avatar_url",
			"create_at",
			"password_hash",
			"salt",
		).Limit(1)

	query, args, err := filter.AttachToSelect(b).ToSql()
	if err != nil {
		s.log.Error("ReadOneUserFull ToSql", logger.Error(err))
		return aggregate.UserFull{}, err
	}

	rows, err := s.client.Query(ctx, query, args...)
	if err != nil {
		s.log.Error("ReadOneUserFull Query", logger.Error(err))
		return aggregate.UserFull{}, err
	}
	defer rows.Close()

	if !rows.Next() {
		return aggregate.UserFull{}, exceptions.ErrNotFound
	}

	var (
		fullUser aggregate.UserFull
		roles    []*int
	)

	if err := rows.Scan(
		&fullUser.User.ID,
		&fullUser.User.Email,
		&fullUser.User.IsConfirm,
		&fullUser.User.UserName,
		&fullUser.Profile.FirstName,
		&fullUser.Profile.SecondName,
		&fullUser.Profile.Gender,
		&fullUser.Profile.DateOfBirth,
		&fullUser.Profile.AvatarURL,
		&fullUser.Profile.CreateAt,
		&fullUser.Credential.PasswordHash,
		&fullUser.Credential.Salt,
		&roles,
	); err != nil {
		s.log.Error("ReadOneUserFull Scan", logger.Error(err))
		return aggregate.UserFull{}, err
	}

	// fill fullUser
	fullUser.Profile.IDUser = fullUser.User.ID
	fullUser.Credential.IDUser = fullUser.User.ID
	fullUser.Roles = fillRolesFromArray(roles)

	return fullUser, nil
}
