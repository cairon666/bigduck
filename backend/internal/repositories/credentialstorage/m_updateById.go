package credentialstorage

import (
	"context"

	"backend/pkg/qb"
	"backend/pkg/tracing"
)

var possibleKeys = []string{
	"email",
	"email_is_confirm",
	"password_hash",
	"salt",
}

func (s *storage) UpdateByID(ctx context.Context, id string, data map[string]any) error {
	ctx, span := tracing.Start(ctx, "credentialstorage.UpdateByID")
	defer span.End()

	builder := qb.Update("public.credentials")

	for _, key := range possibleKeys {
		if value, ok := data[key]; ok {
			builder = builder.Set(qb.Eql(key, value))
		}
	}

	query, args := builder.
		AndWhere(qb.Eql("id", id)).
		ToSQL()

	if _, err := s.client.Exec(ctx, query, args...); err != nil {
		return err
	}

	return nil
}
