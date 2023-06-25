package authusecase

import (
	"context"

	"backend/internal/domain/models"
	validate2 "backend/internal/domain/validate"
	"backend/pkg/tracing"
)

type RecoverPasswordSendRequest struct {
	Email string
}

func NewRecoverPasswordSendRequest(email string) (RecoverPasswordSendRequest, error) {
	if err := validate2.Test(
		validate2.EmailSimple(email),
	); err != nil {
		return RecoverPasswordSendRequest{}, err
	}

	return RecoverPasswordSendRequest{Email: email}, nil
}

// RecoverPasswordSend - first step of recover password.
// Check what email is exist, generate code and send it to email.
func (u *Usecase) RecoverPasswordSend(ctx context.Context, req RecoverPasswordSendRequest) error {
	ctx, span := tracing.Start(ctx, "authusecase.RecoverPasswordSend")
	defer span.End()

	// check what email is exist
	credential, err := u.userService.ReadByEmail(ctx, req.Email)
	if err != nil {
		return err
	}

	// generate code
	code, err := generateCode()
	if err != nil {
		return err
	}

	data := models.NewRecoverPassword(
		credential.Email,
		credential.ID,
		false,
		code,
	)

	// set code
	if err := u.recoverPasswordCodeService.Set(ctx, data, ttlRecoverPasswordCode); err != nil {
		return err
	}

	// send email with code
	u.mailService.SendRecoverPasswordCode(ctx, data.Email, data.Code)

	return nil
}
