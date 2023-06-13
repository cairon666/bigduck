package authusecase

import (
	"context"

	"backend/internal/domain/validate"
)

type ChangeEmailRequest struct {
	IDUser string
	Email  string
}

func (dto *ChangeEmailRequest) IsValid() error {
	return validate.Test(
		validate.UUIDSimple(dto.IDUser),
		validate.EmailSimple(dto.Email),
	)
}

func (u *Usecase) ChangeEmail(ctx context.Context, dto ChangeEmailRequest) error {
	if err := dto.IsValid(); err != nil {
		return err
	}

	_, err := u.credentialService.ReadByEmail(ctx, dto.Email)
	if err != nil {
		return err
	}

	if err := u.credentialService.UpdateEmailByID(ctx, dto.IDUser, dto.Email); err != nil {
		return err
	}

	u.mailService.SendEmailWasUpdate(ctx, dto.Email)

	return nil
}
