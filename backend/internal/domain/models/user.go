package models

import (
	"time"
)

type User struct {
	IdUser       string
	Email        string
	PasswordHash string
	Salt         string
	FirstName    string
	SecondName   string
	DateOfBirth  *time.Time
	Gender       *string
	DateCreate   time.Time
	DateModify   time.Time
}
