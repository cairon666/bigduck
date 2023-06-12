package authusecase

import (
	"context"

	"backend/internal/domain/models"
	"backend/internal/validate"
)

type RecoverPasswordSendRequest struct {
	Email string
}

func (dto *RecoverPasswordSendRequest) IsValid() error {
	return validate.Test(
		validate.EmailSimple(dto.Email),
	)
}

// RecoverPasswordSend - first step of recover password.
// Check what email is exist, generate code and send it to email.
func (u *Usecase) RecoverPasswordSend(ctx context.Context, req RecoverPasswordSendRequest) error {
	if err := req.IsValid(); err != nil {
		return err
	}

	// check what email is exist
	user, err := u.userService.ReadByEmail(ctx, req.Email)
	if err != nil {
		return err
	}

	// generate code
	code, err := generateCode()
	if err != nil {
		return err
	}

	data := models.RecoverPassword{
		Email:        user.Email,
		ID:           user.ID,
		IsConfirm:    false,
		Code:         code,
		PasswordHash: user.PasswordHash,
		Salt:         user.Salt,
	}

	// set code
	if err := u.codeService.SetCode(ctx, data); err != nil {
		return err
	}

	// send email with code
	if err := u.mailService.SendRecoverPasswordCode(ctx, data); err != nil {
		return err
	}

	return nil
}
