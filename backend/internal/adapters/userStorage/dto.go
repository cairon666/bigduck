package userStorage

import "time"

type UserDB struct {
	Id           string
	Email        string
	PasswordHash string
	Salt         string
	FirstName    string
	SecondName   string
	DayOfBirth   *time.Time
	Gender       *string
	DateCreate   time.Time
	DateModify   time.Time
}
