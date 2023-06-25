package models

import (
	"time"
)

type User struct {
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
	Gender         *Gender
	CreateAt       time.Time
}

func NewUser(
	id string,
	email string,
	emailIsConfirm bool,
	passwordHash string,
	salt string,
	firstName string,
	secondName string,
	userName string,
	dateOfBirth *time.Time,
	avatarURL *string,
	gender *Gender,
	createAt time.Time,
) User {
	return User{
		ID:             id,
		Email:          email,
		EmailIsConfirm: emailIsConfirm,
		PasswordHash:   passwordHash,
		Salt:           salt,
		FirstName:      firstName,
		SecondName:     secondName,
		UserName:       userName,
		DateOfBirth:    dateOfBirth,
		AvatarURL:      avatarURL,
		Gender:         gender,
		CreateAt:       createAt,
	}
}
