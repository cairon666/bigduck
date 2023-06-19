package authusecase

import (
	"context"

	"backend/internal/domain/exceptions"
	validate2 "backend/internal/domain/validate"
	"backend/pkg/tracing"
)

type RecoverPasswordConfirmRequest struct {
	Email string
	Code  string
}

func NewRecoverPasswordConfirmRequest(email, code string) (RecoverPasswordConfirmRequest, error) {
	if err := validate2.Test(
		validate2.EmailSimple(email),
		validate2.RecoverPasswordCodeSimple(code),
	); err != nil {
		return RecoverPasswordConfirmRequest{}, err
	}

	return RecoverPasswordConfirmRequest{Email: email, Code: code}, nil
}

func (u *Usecase) RecoverPasswordConfirm(ctx context.Context, req RecoverPasswordConfirmRequest) error {
	ctx, span := tracing.Start(ctx, "authusecase.RecoverPasswordConfirm")
	defer span.End()

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
