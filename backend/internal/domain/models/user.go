package models

import (
	"time"
)

type User struct {
	ID          string
	Email       string
	FirstName   string
	SecondName  string
	UserName    string
	DateOfBirth *time.Time
	AvatarURL   *string
	Gender      *Gender
	CreateAt    time.Time
}

func NewUser(
	id, email, firstName, secondName, userName string,
	dateOfBirth *time.Time,
	avatarURL *string,
	gender *Gender,
	createAt time.Time,
) User {
	return User{
		ID:          id,
		Email:       email,
		FirstName:   firstName,
		SecondName:  secondName,
		UserName:    userName,
		DateOfBirth: dateOfBirth,
		AvatarURL:   avatarURL,
		Gender:      gender,
		CreateAt:    createAt,
	}
}
