package userusecase

import (
	"context"
	"time"

	validate2 "backend/internal/domain/validate"
)

type UpdateByIDRequest struct {
	IDUser      string
	FirstName   string
	SecondName  string
	UserName    string
	Gender      *string
	DateOfBirth *time.Time
	AvatarURL   *string
}

func (dto *UpdateByIDRequest) IsValid() error {
	return validate2.Test(
		validate2.UUIDSimple(dto.IDUser),
		validate2.FirstNameSimple(dto.FirstName),
		validate2.SecondNameSimple(dto.SecondName),
		validate2.UserNameSimple(dto.UserName),
	)
}

func (u *Usecase) UpdateByID(ctx context.Context, dto UpdateByIDRequest) error {
	if err := dto.IsValid(); err != nil {
		return err
	}

	return u.userService.UpdateByID(ctx, dto.IDUser, map[string]any{
		"first_name":    dto.FirstName,
		"second_name":   dto.SecondName,
		"user_name":     dto.UserName,
		"gender":        dto.Gender,
		"date_of_birth": dto.DateOfBirth,
		"avatar_url":    dto.AvatarURL,
	})
}
