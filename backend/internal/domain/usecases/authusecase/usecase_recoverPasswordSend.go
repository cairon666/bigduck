package authusecase

import (
	"context"

	"backend/internal/domain/models"
	validate2 "backend/internal/domain/validate"
)

type RecoverPasswordSendRequest struct {
	Email string
}

func (dto *RecoverPasswordSendRequest) IsValid() error {
	return validate2.Test(
		validate2.EmailSimple(dto.Email),
	)
}

// RecoverPasswordSend - first step of recover password.
// Check what email is exist, generate code and send it to email.
func (u *Usecase) RecoverPasswordSend(ctx context.Context, req RecoverPasswordSendRequest) error {
	if err := req.IsValid(); err != nil {
		return err
	}

	// check what email is exist
	credential, err := u.credentialService.ReadByEmail(ctx, req.Email)
	if err != nil {
		return err
	}

	// generate code
	code, err := generateCode()
	if err != nil {
		return err
	}

	data := models.RecoverPassword{
		Email:        credential.Email,
		ID:           credential.ID,
		IsConfirm:    false,
		Code:         code,
		PasswordHash: credential.PasswordHash,
		Salt:         credential.Salt,
	}

	// set code
	if err := u.recoverPasswordCodeService.Set(ctx, credential.Email, data); err != nil {
		return err
	}

	// send email with code
	u.mailService.SendRecoverPasswordCode(ctx, data.Email, data.Code)

	return nil
}
