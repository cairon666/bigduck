package userusecase

import (
	"context"
	"time"

	"backend/internal/validate"
)

type UpdateByIDRequest struct {
	IDUser      string
	FirstName   string
	SecondName  string
	Gender      *string
	DateOfBirth *time.Time
	AvatarURL   *string
}

func (dto *UpdateByIDRequest) IsValid() error {
	return validate.Test(
		validate.UUIDSimple(dto.IDUser),
		validate.FirstNameSimple(dto.FirstName),
		validate.SecondNameSimple(dto.SecondName),
	)
}

func (u *Usecase) UpdateByID(ctx context.Context, dto UpdateByIDRequest) error {
	if err := dto.IsValid(); err != nil {
		return err
	}

	return u.userService.UpdateByID(ctx, dto.IDUser, map[string]any{
		"modify_at":     time.Now(),
		"first_name":    dto.FirstName,
		"second_name":   dto.SecondName,
		"gender":        dto.Gender,
		"date_of_birth": dto.DateOfBirth,
		"avatar_url":    dto.AvatarURL,
	})
}
