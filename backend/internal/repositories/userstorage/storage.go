package userstorage

import (
	"bytes"
	"context"
	"fmt"

	"backend/internal/domain/models"
	"backend/internal/exceptions"
	"backend/pkg/beda"
	"backend/pkg/database/postgres"
	"backend/pkg/logger"
)

type UserStorage struct {
	client postgres.Client
	log    logger.Logger
}

func NewUserStorage(log logger.Logger, client postgres.Client) *UserStorage {
	return &UserStorage{
		client: client,
		log:    log,
	}
}

func (s *UserStorage) ReadByID(ctx context.Context, id string) (models.User, error) {
	query := `select (id, email, email_is_confirm, password_hash, salt, first_name, second_name, avatar_url,
        day_of_birth, gender, create_at, modify_at) 
from public.user 
where id = $1`

	rows, err := s.client.Query(ctx, query, id)
	if err != nil {
		s.log.Error("Query", logger.Error(err))

		return models.User{}, exceptions.ErrDatabase
	}
	defer rows.Close()

	if !rows.Next() {
		s.log.Error("Next")

		return models.User{}, exceptions.ErrNotFound
	}

	var userDB UserDB
	if err := rows.Scan(&userDB); err != nil {
		s.log.Error("Scan", logger.Error(err))

		return models.User{}, beda.Wrap("Scan", exceptions.ErrDatabase)
	}

	user := models.User{
		ID:             userDB.ID,
		Email:          userDB.Email,
		EmailIsConfirm: userDB.EmailIsConfirm,
		PasswordHash:   userDB.PasswordHash,
		Salt:           userDB.Salt,
		FirstName:      userDB.FirstName,
		SecondName:     userDB.SecondName,
		AvatarURL:      userDB.AvatarURL,
		DateOfBirth:    userDB.DateOfBirth,
		Gender:         nil,
		CreateAt:       userDB.CreateAt,
		ModifyAt:       userDB.ModifyAt,
	}

	if userDB.Gender != nil {
		tmp, err := models.ParseGender(*userDB.Gender)
		if err != nil {
			return models.User{}, beda.Wrap("ParseGender", exceptions.ErrDatabase)
		}

		user.Gender = &tmp
	}

	return user, nil
}

func (s *UserStorage) ReadByEmail(ctx context.Context, email string) (models.User, error) {
	query := `select (id, email, email_is_confirm, password_hash, salt, first_name, second_name, avatar_url, 
        day_of_birth, gender, create_at, modify_at) 
from public.user 
where email = $1`

	rows, err := s.client.Query(ctx, query, email)
	if err != nil {
		s.log.Error("Query", logger.Error(err))

		return models.User{}, beda.Wrap("Query", exceptions.ErrDatabase)
	}
	defer rows.Close()

	if !rows.Next() {
		s.log.Error("Next")

		return models.User{}, beda.Wrap("Next", exceptions.ErrNotFound)
	}

	var userDB UserDB
	if err := rows.Scan(&userDB); err != nil {
		s.log.Error("Scan", logger.Error(err))

		return models.User{}, beda.Wrap("Scan", exceptions.ErrDatabase)
	}

	user := models.User{
		ID:             userDB.ID,
		Email:          userDB.Email,
		EmailIsConfirm: userDB.EmailIsConfirm,
		PasswordHash:   userDB.PasswordHash,
		Salt:           userDB.Salt,
		FirstName:      userDB.FirstName,
		SecondName:     userDB.SecondName,
		AvatarURL:      userDB.AvatarURL,
		DateOfBirth:    userDB.DateOfBirth,
		Gender:         nil,
		CreateAt:       userDB.CreateAt,
		ModifyAt:       userDB.ModifyAt,
	}

	if userDB.Gender != nil {
		tmp, err := models.ParseGender(*userDB.Gender)
		if err != nil {
			return models.User{}, beda.Wrap("ParseGender", exceptions.ErrDatabase)
		}

		user.Gender = &tmp
	}

	return user, nil
}

func (s *UserStorage) Create(ctx context.Context, user models.User) error {
	query := `insert into public.user(id, email, email_is_confirm, password_hash, salt, first_name, second_name, 
                        avatar_url, day_of_birth, gender, create_at, modify_at) 
values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,  $11, $12)`

	_, err := s.client.Exec(ctx, query,
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
	)
	if err != nil {
		s.log.Error("Exec", logger.Error(err))

		return exceptions.ErrDatabase
	}

	return nil
}

func (s *UserStorage) UpdateByID(ctx context.Context, id string, data map[string]any) error {
	var query bytes.Buffer

	count := 1
	args := make([]any, 0)
	_, _ = query.WriteString("update public.user ")
	_, _ = query.WriteString("set ")

	isFirst := true

	for key, value := range data {
		if isFirst {
			isFirst = false
		} else {
			query.WriteString("and ")
		}

		query.WriteString(fmt.Sprintf("%s = $%d ", key, count))
		count++
		args = append(args, value) //nolint:wsl
	}

	args = append(args, id)
	query.WriteString(fmt.Sprintf("where id = $%d ", count)) //nolint:wsl

	if _, err := s.client.Exec(ctx, query.String(), args...); err != nil {
		s.log.Error("Exec", logger.Error(err))

		return beda.Wrap("Exec", exceptions.ErrDatabase)
	}

	return nil
}

func (s *UserStorage) DeleteByID(ctx context.Context, id string) error {
	query := "delete from public.user where id = $1"

	if _, err := s.client.Exec(ctx, query, id); err != nil {
		s.log.Error("Exec", logger.Error(err))

		return exceptions.ErrDatabase
	}

	return nil
}
