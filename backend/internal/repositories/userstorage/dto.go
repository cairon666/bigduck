package userstorage

import (
	"time"

	"backend/internal/domain/models"
)

type UserDB struct {
	ID             string
	Email          string
	EmailIsConfirm bool
	PasswordHash   string
	Salt           string
	FirstName      string
	SecondName     string
	AvatarURL      *string
	DateOfBirth    *time.Time
	Gender         *string
	CreateAt       time.Time
	ModifyAt       time.Time
}

func (userDB *UserDB) ToUser() (models.User, error) {
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
		Gender:         nil, // later
		CreateAt:       userDB.CreateAt,
		ModifyAt:       userDB.ModifyAt,
	}

	if userDB.Gender != nil {
		tmp, err := models.ParseGender(*userDB.Gender)
		if err != nil {
			return models.User{}, err
		}

		user.Gender = &tmp
	}

	return user, nil
}
