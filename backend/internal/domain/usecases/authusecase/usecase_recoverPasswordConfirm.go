package authusecase

import (
	"context"

	"backend/internal/exceptions"
	"backend/internal/validate"
)

type RecoverPasswordConfirmRequest struct {
	Email string
	Code  string
}

func (dto *RecoverPasswordConfirmRequest) IsValid() error {
	return validate.Test(
		validate.EmailSimple(dto.Email),
		validate.RecoverCodeSimple(dto.Code),
	)
}

func (u *Usecase) RecoverPasswordConfirm(ctx context.Context, req RecoverPasswordConfirmRequest) error {
	if err := req.IsValid(); err != nil {
		return err
	}

	// create code
	data, err := u.codeService.GetCodeByEmail(ctx, req.Email)
	if err != nil {
		return err
	}

	// check code
	if data.Code != req.Code {
		return exceptions.ErrBadRecoverCode
	}

	data.IsConfirm = true

	if err := u.codeService.SetCode(ctx, data); err != nil {
		return err
	}

	return nil
}
