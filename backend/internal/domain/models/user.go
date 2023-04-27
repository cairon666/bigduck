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
	AvatarURL      *string
	DateOfBirth    *time.Time
	Gender         *Gender
	CreateAt       time.Time
	ModifyAt       time.Time
}
