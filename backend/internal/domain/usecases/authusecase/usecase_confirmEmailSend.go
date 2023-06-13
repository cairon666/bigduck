package authusecase

import (
	"context"

	"backend/internal/domain/models"
	"backend/internal/domain/validate"
)

type ConfirmEmailSendRequest struct {
	IDUser string
}

func (dto *ConfirmEmailSendRequest) IsValid() error {
	return validate.Test(
		validate.UUIDSimple(dto.IDUser),
	)
}

func (u *Usecase) ConfirmEmailSend(ctx context.Context, dto ConfirmEmailSendRequest) error {
	if err := dto.IsValid(); err != nil {
		return err
	}

	credential, err := u.credentialService.ReadByID(ctx, dto.IDUser)
	if err != nil {
		return err
	}

	code, err := generateCode()
	if err != nil {
		return err
	}

	data := models.ConfirmEmail{Code: code}

	if err := u.confirmEmailCodeService.Set(ctx, dto.IDUser, data); err != nil {
		return err
	}

	u.mailService.SendEmailConfirmCode(ctx, credential.Email, code)

	return nil
}
