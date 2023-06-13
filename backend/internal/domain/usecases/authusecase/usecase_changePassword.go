package authusecase

import (
	"context"

	"backend/internal/domain/exceptions"
	"backend/internal/domain/validate"
)

type ChangePasswordRequest struct {
	IDUser      string
	OldPassword string
	NewPassword string
}

func (dto *ChangePasswordRequest) IsValid() error {
	return validate.Test(
		validate.UUIDSimple(dto.IDUser),
		validate.PasswordSimple(dto.OldPassword),
		validate.PasswordSimple(dto.NewPassword),
	)
}

func (u *Usecase) ChangePassword(ctx context.Context, dto ChangePasswordRequest) error {
	if err := dto.IsValid(); err != nil {
		return err
	}

	credentials, err := u.credentialService.ReadByID(ctx, dto.IDUser)
	if err != nil {
		return err
	}

	if err := checkPasswordHash(dto.OldPassword, credentials.Salt, credentials.PasswordHash); err != nil {
		return exceptions.ErrWrongOldPassword
	}

	hash, salt, err := generateHashPassword(dto.NewPassword)
	if err != nil {
		return err
	}

	if err := u.credentialService.UpdatePasswordByID(ctx, dto.IDUser, hash, salt); err != nil {
		return err
	}

	u.mailService.SendPasswordWasUpdate(ctx, credentials.Email)

	return nil
}
