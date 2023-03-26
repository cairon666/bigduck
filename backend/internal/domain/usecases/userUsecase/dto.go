package userUsecase

import (
	"time"
)

// --------------------- READ -----------------

type ReadByIdRequest struct {
	IdUser string
}

func (dto *ReadByIdRequest) IsValid() error {
	return nil
}

type ReadByIdResponse struct {
	Id          string
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

type UpdateByIdRequest struct {
	IdUser      string
	FirstName   string
	SecondName  string
	Gender      *string
	DateOfBirth *time.Time
	AvatarURL   *string
}

func (dto *UpdateByIdRequest) IsValid() error {
	return nil
}

// --------------------- DELETE -----------------

type DeleteByIdRequest struct {
	IdUser string
}

func (dto *DeleteByIdRequest) IsValid() error {
	return nil
}
