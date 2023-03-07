package userStorage

import (
	"authService/internal/domain/exceptions"
	"authService/internal/domain/models"
	"authService/pkg/beda"
	"authService/pkg/database/postgres"
	"context"
)

type UserStorage struct {
	client postgres.Client
}

func NewUserStorage(client postgres.Client) *UserStorage {
	return &UserStorage{
		client: client,
	}
}

func (storage *UserStorage) GetById(ctx context.Context, id string) (models.User, error) {
	query := `select (id, email, password_hash, salt, first_name, second_name, day_of_birth, gender, date_create, date_modify) 
from public.user
where id = $1
limit 1`
	rows, err := storage.client.Query(ctx, query, id)
	if err != nil {
		return models.User{}, beda.New(exceptions.ErrorDatabase, err)
	}
	defer rows.Close()

	if !rows.Next() {
		return models.User{}, beda.New(exceptions.ErrorNotFound, nil)
	}

	user := UserDB{}
	err = rows.Scan(&user)
	if err != nil {
		return models.User{}, beda.New(exceptions.ErrorDatabase, err)
	}

	return models.User{
		IdUser:       user.Id,
		Email:        user.Email,
		PasswordHash: user.PasswordHash,
		Salt:         user.Salt,
		FirstName:    user.FirstName,
		SecondName:   user.SecondName,
		DateOfBirth:  user.DayOfBirth,
		Gender:       user.Gender,
		DateCreate:   user.DateCreate,
		DateModify:   user.DateModify,
	}, nil
}

func (storage *UserStorage) GetByEmail(ctx context.Context, email string) (models.User, error) {
	query := `select (id, email, password_hash, salt, first_name, second_name, day_of_birth, gender, date_create, date_modify) 
from public.user
where email = $1
limit 1`
	rows, err := storage.client.Query(ctx, query, email)
	if err != nil {
		return models.User{}, beda.New(exceptions.ErrorDatabase, err)
	}
	defer rows.Close()

	if !rows.Next() {
		return models.User{}, beda.New(exceptions.ErrorNotFound, nil)
	}

	user := UserDB{}
	err = rows.Scan(&user)
	if err != nil {
		return models.User{}, beda.New(exceptions.ErrorDatabase, err)
	}

	return models.User{
		IdUser:       user.Id,
		Email:        user.Email,
		PasswordHash: user.PasswordHash,
		Salt:         user.Salt,
		FirstName:    user.FirstName,
		SecondName:   user.SecondName,
		DateOfBirth:  user.DayOfBirth,
		Gender:       user.Gender,
		DateCreate:   user.DateCreate,
		DateModify:   user.DateModify,
	}, nil
}

func (storage *UserStorage) Create(ctx context.Context, user models.User) error {
	query := `insert into public.user(id, email, password_hash, salt, first_name, second_name, day_of_birth, gender, date_create, date_modify)
	values ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10)`
	row, err := storage.client.Query(
		ctx,
		query,
		user.IdUser,
		user.Email,
		user.PasswordHash,
		user.Salt,
		user.FirstName,
		user.SecondName,
		user.DateOfBirth,
		user.Gender,
		user.DateCreate,
		user.DateModify,
	)
	if err != nil {
		return beda.New(exceptions.ErrorDatabase, err)
	}
	defer row.Close()

	return nil
}
