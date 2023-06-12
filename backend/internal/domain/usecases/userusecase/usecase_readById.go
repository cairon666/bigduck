package userusecase

import (
	"context"
	"time"

	"backend/internal/validate"
)

type ReadByIDRequest struct {
	IDUser string
}

func (dto *ReadByIDRequest) IsValid() error {
	return validate.Test(
		validate.UUIDSimple(dto.IDUser),
	)
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

func (u *Usecase) ReadByID(ctx context.Context, dto ReadByIDRequest) (ReadByIDResponse, error) {
	if err := dto.IsValid(); err != nil {
		return ReadByIDResponse{}, err
	}

	user, err := u.userService.ReadByID(ctx, dto.IDUser)
	if err != nil {
		return ReadByIDResponse{}, err
	}

	resp := ReadByIDResponse{
		ID:          user.ID,
		Email:       user.Email,
		FirstName:   user.FirstName,
		SecondName:  user.SecondName,
		Gender:      nil,
		DateOfBirth: user.DateOfBirth,
		AvatarURL:   user.AvatarURL,
		CreateAt:    user.CreateAt,
		ModifyAt:    user.ModifyAt,
	}

	if user.Gender != nil {
		tmp := user.Gender.ToString()
		resp.Gender = &tmp
	}

	return resp, nil
}
