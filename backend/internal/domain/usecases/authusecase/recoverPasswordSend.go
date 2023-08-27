package authusecase

import (
	"context"

	"backend/internal/domain/models"
	"backend/internal/security"
	"backend/pkg/tracing"
)

type RecoverPasswordSendRequest struct {
	Email string
}

func NewRecoverPasswordSendRequest(email string) RecoverPasswordSendRequest {
	return RecoverPasswordSendRequest{Email: email}
}

// RecoverPasswordSend - first step of recover password.
// Check what email is exist, generate code and send it to email.
func (u *Usecase) RecoverPasswordSend(ctx context.Context, req RecoverPasswordSendRequest) error {
	ctx, span := tracing.Start(ctx, "authusecase.RecoverPasswordSend")
	defer span.End()

	// check what email is exist
	user, err := u.userService.ReadOneUserByEmail(ctx, req.Email)
	if err != nil {
		return err
	}

	code, err := security.GenerateCode()
	if err != nil {
		return err
	}

	data := models.NewRecoverPassword(user.ID, user.Email, false, code)

	// set code
	if err := u.recoverPasswordCodeService.Set(ctx, &data, ttlRecoverPasswordCode); err != nil {
		return err
	}

	// send email with code
	u.mailService.SendRecoverPasswordCode(ctx, data.Email, data.Code)

	return nil
}
