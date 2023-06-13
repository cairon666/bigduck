package authusecase

import (
	"context"

	"backend/internal/domain/exceptions"
	validate2 "backend/internal/domain/validate"
)

type RecoverPasswordConfirmRequest struct {
	Email string
	Code  string
}

func (dto *RecoverPasswordConfirmRequest) IsValid() error {
	return validate2.Test(
		validate2.EmailSimple(dto.Email),
		validate2.RecoverPasswordCodeSimple(dto.Code),
	)
}

func (u *Usecase) RecoverPasswordConfirm(ctx context.Context, req RecoverPasswordConfirmRequest) error {
	if err := req.IsValid(); err != nil {
		return err
	}

	// create code
	data, err := u.recoverPasswordCodeService.Get(ctx, req.Email)
	if err != nil {
		return err
	}

	// check code
	if data.Code != req.Code {
		return exceptions.ErrBadRecoverCode
	}

	data.IsConfirm = true

	if err := u.recoverPasswordCodeService.Set(ctx, data.Email, data); err != nil {
		return err
	}

	return nil
}
