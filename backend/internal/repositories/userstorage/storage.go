package userstorage

import (
	"time"

	"backend/internal/domain/models"
	"github.com/jackc/pgx/v5/pgxpool"
)

type UserStorage struct {
	client *pgxpool.Pool
}

func NewUserStorage(client *pgxpool.Pool) *UserStorage {
	return &UserStorage{
		client: client,
	}
}

type DBUser struct {
	ID             string
	Email          string
	EmailIsConfirm bool
	PasswordHash   string
	Salt           string
	FirstName      string
	SecondName     string
	UserName       string
	DateOfBirth    *time.Time
	AvatarURL      *string
	Gender         *string
	CreateAt       time.Time
}

func (dbu *DBUser) ToModelUser() models.User {
	return models.User{
		ID:             dbu.ID,
		Email:          dbu.Email,
		EmailIsConfirm: dbu.EmailIsConfirm,
		PasswordHash:   dbu.PasswordHash,
		Salt:           dbu.Salt,
		FirstName:      dbu.FirstName,
		SecondName:     dbu.SecondName,
		UserName:       dbu.UserName,
		DateOfBirth:    dbu.DateOfBirth,
		AvatarURL:      dbu.AvatarURL,
		Gender:         models.MustParseGenderPoint(dbu.Gender),
		CreateAt:       dbu.CreateAt,
	}
}
