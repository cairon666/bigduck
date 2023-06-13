package credentialstorage

import (
	"context"

	"backend/internal/domain/exceptions"
	"backend/internal/domain/models"
	"backend/pkg/qb"
)

func (s *storage) ReadOne(ctx context.Context, filter map[string]any) (models.Credential, error) {
	builder := qb.
		Select(
			"id",
			"email",
			"email_is_confirm",
			"password_hash",
			"salt",
		).
		From("public.credentials")

	if id, ok := filter["id"]; ok {
		builder = builder.AndWhere(qb.Eql("id", id))
	}

	if email, ok := filter["email"]; ok {
		builder = builder.AndWhere(qb.Eql("email", email))
	}

	query, args := builder.ToSQL()

	rows, err := s.client.Query(ctx, query, args...)
	if err != nil {
		return models.Credential{}, err
	}
	defer rows.Close()

	if !rows.Next() {
		return models.Credential{}, exceptions.ErrNotFound
	}

	var credentials models.Credential
	if err := rows.Scan(
		&credentials.ID,
		&credentials.Email,
		&credentials.EmailIsConfirm,
		&credentials.PasswordHash,
		&credentials.Salt,
	); err != nil {
		return models.Credential{}, err
	}

	return credentials, nil
}
