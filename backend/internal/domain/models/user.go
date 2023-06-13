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
