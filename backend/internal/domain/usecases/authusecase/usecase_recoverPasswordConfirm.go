package authusecase

import (
	"context"
	"time"

	"backend/internal/domain/models"
	"backend/internal/exceptions"
	"backend/pkg/tracing"
)

var (
	ttlRecoverPasswordCode = time.Minute * 5
)

type RecoverPasswordConfirmRequest struct {
	Email string
	Code  string
}

func NewRecoverPasswordConfirmRequest(email, code string) RecoverPasswordConfirmRequest {
	return RecoverPasswordConfirmRequest{Email: email, Code: code}
}

func (u *Usecase) RecoverPasswordConfirm(ctx context.Context, req RecoverPasswordConfirmRequest) error {
	ctx, span := tracing.Start(ctx, "authusecase.RecoverPasswordConfirm")
	defer span.End()

	// create code
	data, err := u.recoverPasswordCodeService.Get(ctx, models.RecoverPasswordKey(req.Email))
	if err != nil {
		return err
	}

	// check code
	if data.Code != req.Code {
		return exceptions.ErrBadRecoverCode
	}

	data.IsConfirm = true

	if err := u.recoverPasswordCodeService.Set(ctx, data, ttlRecoverPasswordCode); err != nil {
		return err
	}

	return nil
}
