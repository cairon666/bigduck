package userusecase

import (
	"time"
)

// --------------------- READ -----------------

type ReadByIDRequest struct {
	IDUser string
}

func (dto *ReadByIDRequest) IsValid() error {
	return nil
}

type ReadByIDResponse struct {
	ID          string
	Email       string
	FirstName   string
	SecondName  string
	AvatarURL   *string
	DateOfBirth *time.Time
	Gender      *string
	CreateAt    time.Time
	ModifyAt    time.Time
}

// --------------------- UPDATE -----------------

type UpdateByIDRequest struct {
	IDUser      string
	FirstName   string
	SecondName  string
	Gender      *string
	DateOfBirth *time.Time
	AvatarURL   *string
}

func (dto *UpdateByIDRequest) IsValid() error {
	return nil
}

// --------------------- DELETE -----------------

type DeleteByIDRequest struct {
	IDUser string
}

func (dto *DeleteByIDRequest) IsValid() error {
	return nil
}
