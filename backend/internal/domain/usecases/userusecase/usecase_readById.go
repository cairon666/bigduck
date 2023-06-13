package userusecase

import (
	"context"
	"time"

	validate2 "backend/internal/domain/validate"
)

type ReadByIDRequest struct {
	IDUser string
}

func (dto *ReadByIDRequest) IsValid() error {
	return validate2.Test(
		validate2.UUIDSimple(dto.IDUser),
	)
}

type ReadByIDResponse struct {
	ID          string
	Email       string
	FirstName   string
	SecondName  string
	UserName    string
	AvatarURL   *string
	DateOfBirth *time.Time
	Gender      *string
	CreateAt    time.Time
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
		UserName:    user.UserName,
		Gender:      nil,
		DateOfBirth: user.DateOfBirth,
		AvatarURL:   user.AvatarURL,
		CreateAt:    user.CreateAt,
	}

	if user.Gender != nil {
		tmp := user.Gender.ToString()
		resp.Gender = &tmp
	}

	return resp, nil
}
