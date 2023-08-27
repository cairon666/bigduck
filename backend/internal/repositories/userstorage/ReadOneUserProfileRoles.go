package userstorage

import (
	"context"

	"backend/internal/domain/aggregate"
	"backend/internal/exceptions"
	"backend/pkg/filter"
	"backend/pkg/logger"
	"backend/pkg/tracing"
)

func (s *Storage) ReadOneUserProfileRoles(
	ctx context.Context,
	filter filter.Filter,
) (aggregate.UserProfileRoles, error) {
	ctx, span := tracing.Start(ctx, "userstorage.ReadOneUserProfileRoles")
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
		"array_agg(user_roles.id_role) as roles",
	).
		From("public.users users").
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
		).Limit(1)

	query, args, err := filter.AttachToSelect(b).ToSql()
	if err != nil {
		s.log.Error("ReadOneUserProfileRoles ToSql", logger.Error(err))
		return aggregate.UserProfileRoles{}, err
	}

	rows, err := s.client.Query(ctx, query, args...)
	if err != nil {
		s.log.Error("ReadOneUserProfileRoles Query", logger.Error(err))
		return aggregate.UserProfileRoles{}, err
	}
	defer rows.Close()

	if !rows.Next() {
		return aggregate.UserProfileRoles{}, exceptions.ErrNotFound
	}

	var (
		userProfileRoles aggregate.UserProfileRoles
		roles            []*int
	)

	if err := rows.Scan(
		&userProfileRoles.User.ID,
		&userProfileRoles.User.Email,
		&userProfileRoles.User.IsConfirm,
		&userProfileRoles.User.UserName,
		&userProfileRoles.Profile.FirstName,
		&userProfileRoles.Profile.SecondName,
		&userProfileRoles.Profile.Gender,
		&userProfileRoles.Profile.DateOfBirth,
		&userProfileRoles.Profile.AvatarURL,
		&userProfileRoles.Profile.CreateAt,
		&roles,
	); err != nil {
		s.log.Error("ReadOneUserProfileRoles Scan", logger.Error(err))
		return aggregate.UserProfileRoles{}, err
	}

	// fill user_id
	userProfileRoles.Profile.IDUser = userProfileRoles.User.ID
	userProfileRoles.Roles = fillRolesFromArray(roles)

	return userProfileRoles, nil
}
