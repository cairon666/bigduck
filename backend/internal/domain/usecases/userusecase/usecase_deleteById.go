package userusecase

import (
	"context"

	"backend/internal/validate"
)

type DeleteByIDRequest struct {
	IDUser string
}

func (dto *DeleteByIDRequest) IsValid() error {
	return validate.Test(
		validate.UUIDSimple(dto.IDUser),
	)
}

func (u *Usecase) DeleteByID(ctx context.Context, dto DeleteByIDRequest) error {
	if err := dto.IsValid(); err != nil {
		return err
	}

	return u.userService.DeleteByID(ctx, dto.IDUser)
}
