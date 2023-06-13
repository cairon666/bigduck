package authusecase

import (
	"context"

	"backend/internal/domain/exceptions"
	"backend/internal/domain/validate"
)

type ConfirmEmailConfirmRequest struct {
	IDUser string
	Code   string
}

func (dto *ConfirmEmailConfirmRequest) IsValid() error {
	return validate.Test(
		validate.UUIDSimple(dto.IDUser),
		validate.ConfirmEmailCodeSimple(dto.Code),
	)
}

func (u *Usecase) ConfirmEmailConfirm(ctx context.Context, dto ConfirmEmailConfirmRequest) error {
	if err := dto.IsValid(); err != nil {
		return err
	}

	data, err := u.confirmEmailCodeService.Get(ctx, dto.IDUser)
	if err != nil {
		return err
	}

	if data.Code != dto.Code {
		return exceptions.ErrBadEmailConfirmCode
	}

	if err := u.credentialService.ConfirmEmailByID(ctx, dto.IDUser); err != nil {
		return err
	}

	return nil
}
