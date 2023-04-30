package userstorage

import (
	"context"
	"errors"

	"backend/internal/domain/models"
	"backend/internal/exceptions"
	"backend/pkg/database/postgres"
	"backend/pkg/qb"
	"github.com/jackc/pgx/v5/pgconn"
)

type UserStorage struct {
	client postgres.PgxPool
}

func NewUserStorage(client postgres.PgxPool) *UserStorage {
	return &UserStorage{
		client: client,
	}
}

func (s *UserStorage) ReadOne(ctx context.Context, filter map[string]any) (models.User, error) {
	builder := qb.Select(
		"id",
		"email",
		"email_is_confirm",
		"password_hash",
		"salt",
		"first_name",
		"second_name",
		"avatar_url",
		"day_of_birth",
		"gender",
		"create_at",
		"modify_at",
	).
		From("public.user")

	if value, ok := filter["id"]; ok {
		builder = builder.AndWhere(qb.Eql("id", value))
	}

	if value, ok := filter["email"]; ok {
		builder = builder.AndWhere(qb.Eql("email", value))
	}

	query, args := builder.ToSQL()

	rows, err := s.client.Query(ctx, query, args...)
	if err != nil {
		return models.User{}, exceptions.ErrDatabase
	}
	defer rows.Close()

	if !rows.Next() {
		return models.User{}, exceptions.ErrNotFound
	}

	var userDB UserDB
	if err := rows.Scan(
		&userDB.ID,
		&userDB.Email,
		&userDB.EmailIsConfirm,
		&userDB.PasswordHash,
		&userDB.Salt,
		&userDB.FirstName,
		&userDB.SecondName,
		&userDB.AvatarURL,
		&userDB.DateOfBirth,
		&userDB.Gender,
		&userDB.CreateAt,
		&userDB.ModifyAt,
	); err != nil {
		return models.User{}, exceptions.ErrDatabase
	}

	user, err := userDB.ToUser()
	if err != nil {
		return models.User{}, err
	}

	return user, nil
}

func (s *UserStorage) Create(ctx context.Context, user models.User) error {
	query, args := qb.Insert(
		"public.user",
		"id",
		"email",
		"email_is_confirm",
		"password_hash",
		"salt",
		"first_name",
		"second_name",
		"avatar_url",
		"day_of_birth",
		"gender",
		"create_at",
		"modify_at").
		Values(
			user.ID,
			user.Email,
			user.EmailIsConfirm,
			user.PasswordHash,
			user.Salt,
			user.FirstName,
			user.SecondName,
			user.AvatarURL,
			user.DateOfBirth,
			user.Gender,
			user.CreateAt,
			user.ModifyAt,
		).
		ToSQL()

	_, err := s.client.Exec(ctx, query, args...)
	if err != nil {
		if pgErr := new(pgconn.PgError); errors.As(err, &pgErr) {
			switch pgErr.ConstraintName {
			case "credential_email_uniq":
				return exceptions.ErrEmailAlreadyExist
			default:
				return exceptions.ErrDatabase
			}
		}
	}

	return nil
}

func (s *UserStorage) UpdateByID(ctx context.Context, id string, data map[string]any) error {
	builder := qb.Update("public.user")

	for key, value := range data {
		builder = builder.Set(qb.Eql(key, value))
	}

	query, args := builder.
		AndWhere(qb.Eql("id", id)).
		Limit(1).
		ToSQL()

	if _, err := s.client.Exec(ctx, query, args...); err != nil {
		return exceptions.ErrDatabase
	}

	return nil
}

func (s *UserStorage) DeleteByID(ctx context.Context, id string) error {
	query := "delete from public.user where id = $1"

	if _, err := s.client.Exec(ctx, query, id); err != nil {
		return exceptions.ErrDatabase
	}

	return nil
}
