package userstorage

import "time"

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
