package models

import (
	"time"

	"github.com/google/uuid"
)

type Profile struct {
	IDUser      uuid.UUID
	FirstName   string
	SecondName  string
	Gender      *Gender
	DateOfBirth *time.Time
	AvatarURL   *string
	CreateAt    time.Time
}

func NewProfile(
	idUser uuid.UUID,
	firstName string,
	secondName string,
	gender *Gender,
	dayOFBirth *time.Time,
	avatarURL *string,
	createAt time.Time) Profile {
	return Profile{
		IDUser:      idUser,
		FirstName:   firstName,
		SecondName:  secondName,
		Gender:      gender,
		DateOfBirth: dayOFBirth,
		AvatarURL:   avatarURL,
		CreateAt:    createAt,
	}
}
