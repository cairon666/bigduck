package userusecase

import (
	"context"

	validate2 "backend/internal/domain/validate"
)

type DeleteByIDRequest struct {
	IDUser string
}

func (dto *DeleteByIDRequest) IsValid() error {
	return validate2.Test(
		validate2.UUIDSimple(dto.IDUser),
	)
}

func (u *Usecase) DeleteByID(ctx context.Context, dto DeleteByIDRequest) error {
	if err := dto.IsValid(); err != nil {
		return err
	}

	return u.userService.DeleteByID(ctx, dto.IDUser)
}
