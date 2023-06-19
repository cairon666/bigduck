package userstorage

import (
	"context"

	"backend/pkg/qb"
	"backend/pkg/tracing"
	"github.com/pkg/errors"
)

var possibleUpdateKeys = []string{
	"email",
	"first_name",
	"second_name",
	"user_name",
	"day_of_birth",
	"avatar_url",
	"gender",
	"create_at",
}

func (s *UserStorage) UpdateByID(ctx context.Context, id string, data map[string]any) error {
	ctx, span := tracing.Start(ctx, "userstorage.UpdateByID")
	defer span.End()

	builder := qb.Update("public.users")

	for _, key := range possibleUpdateKeys {
		if value, ok := data[key]; ok {
			builder = builder.Set(qb.Eql(key, value))
		}
	}

	query, args := builder.
		AndWhere(qb.Eql("id", id)).
		ToSQL()

	if _, err := s.client.Exec(ctx, query, args...); err != nil {
		return errors.Wrap(err, "usercredentials.UpdateByID")
	}

	return nil
}
