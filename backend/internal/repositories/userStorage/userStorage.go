package userStorage

import (
	"backend/internal/domain/models"
	"backend/internal/exceptions"
	"backend/pkg/database/postgres"
	"backend/pkg/logger"
	"context"
	"fmt"
	"strings"
)

type userStorage struct {
	client postgres.Client
	log    logger.Logger
}

func NewUserStorage(log logger.Logger, client postgres.Client) *userStorage {
	return &userStorage{
		client: client,
		log:    log,
	}
}

func (s *userStorage) ReadById(ctx context.Context, id string) (models.User, error) {
	query := `select (id, email, email_is_confirm, password_hash, salt, first_name, second_name, avatar_url, day_of_birth, gender, create_at, modify_at) 
from public.user 
where id = $1`

	rows, err := s.client.Query(ctx, query, id)
	if err != nil {
		s.log.Error("Query", logger.Error(err))
		return models.User{}, exceptions.ErrorDatabase
	}
	defer rows.Close()

	if !rows.Next() {
		s.log.Error("Next")
		return models.User{}, exceptions.ErrorNotFound
	}

	var userDB UserDB
	if err := rows.Scan(&userDB); err != nil {
		s.log.Error("Scan", logger.Error(err))
		return models.User{}, exceptions.ErrorDatabase
	}

	return models.User{
		Id:             userDB.Id,
		Email:          userDB.Email,
		EmailIsConfirm: userDB.EmailIsConfirm,
		PasswordHash:   userDB.PasswordHash,
		Salt:           userDB.Salt,
		FirstName:      userDB.FirstName,
		SecondName:     userDB.SecondName,
		AvatarURL:      userDB.AvatarURL,
		DateOfBirth:    userDB.DateOfBirth,
		Gender:         models.ParseGender(userDB.Gender),
		CreateAt:       userDB.CreateAt,
		ModifyAt:       userDB.ModifyAt,
	}, nil
}

func (s *userStorage) ReadByEmail(ctx context.Context, email string) (models.User, error) {
	query := `select (id, email, email_is_confirm, password_hash, salt, first_name, second_name, avatar_url, day_of_birth, gender, create_at, modify_at) 
from public.user 
where email = $1`

	rows, err := s.client.Query(ctx, query, email)
	if err != nil {
		s.log.Error("Query", logger.Error(err))
		return models.User{}, exceptions.ErrorDatabase
	}
	defer rows.Close()

	if !rows.Next() {
		s.log.Error("Next")
		return models.User{}, exceptions.ErrorNotFound
	}

	var userDB UserDB
	if err := rows.Scan(&userDB); err != nil {
		s.log.Error("Scan", logger.Error(err))
		return models.User{}, exceptions.ErrorDatabase
	}

	return models.User{
		Id:             userDB.Id,
		Email:          userDB.Email,
		EmailIsConfirm: userDB.EmailIsConfirm,
		PasswordHash:   userDB.PasswordHash,
		Salt:           userDB.Salt,
		FirstName:      userDB.FirstName,
		SecondName:     userDB.SecondName,
		AvatarURL:      userDB.AvatarURL,
		DateOfBirth:    userDB.DateOfBirth,
		Gender:         models.ParseGender(userDB.Gender),
		CreateAt:       userDB.CreateAt,
		ModifyAt:       userDB.ModifyAt,
	}, nil
}

func (s *userStorage) Create(ctx context.Context, user models.User) error {
	query := `insert into public.user(id, email, email_is_confirm, password_hash, salt, first_name, second_name, avatar_url, day_of_birth, gender, create_at, modify_at) 
values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,  $11, $12)`

	_, err := s.client.Exec(ctx, query,
		user.Id,
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
		// TODO parse error already exist
		return exceptions.ErrorDatabase
	}

	return nil
}

func (s *userStorage) UpdateById(ctx context.Context, id string, data map[string]any) error {
	var query strings.Builder

	count := 1
	args := make([]any, 0)
	query.WriteString("update public.user ")

	query.WriteString("set ")
	isFirst := true
	for key, value := range data {
		if isFirst {
			isFirst = false
		} else {
			query.WriteString("and ")
		}
		query.WriteString(fmt.Sprintf("%s = $%d ", key, count))
		args = append(args, value)
		count++
	}

	query.WriteString(fmt.Sprintf("where id = $%d ", count))
	args = append(args, id)

	if _, err := s.client.Exec(ctx, query.String(), args...); err != nil {
		s.log.Error("Exec", logger.Error(err))
		return exceptions.ErrorDatabase
	}

	return nil
}

func (s *userStorage) DeleteById(ctx context.Context, id string) error {
	query := "delete from public.user where id = $1"

	if _, err := s.client.Exec(ctx, query, id); err != nil {
		s.log.Error("Exec", logger.Error(err))
		return exceptions.ErrorDatabase
	}

	return nil
}
