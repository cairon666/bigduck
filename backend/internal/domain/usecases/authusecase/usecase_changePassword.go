package authusecase

import (
	"context"

	"backend/internal/domain/exceptions"
	"backend/internal/domain/validate"
	"backend/pkg/tracing"
)

type ChangePasswordRequest struct {
	IDUser      string
	OldPassword string
	NewPassword string
}

func NewChangePasswordRequest(idUser, oldPassword, newPassword string) (ChangePasswordRequest, error) {
	if err := validate.Test(
		validate.UUIDSimple(idUser),
		validate.PasswordSimple(oldPassword),
		validate.PasswordSimple(newPassword),
	); err != nil {
		return ChangePasswordRequest{}, err
	}

	return ChangePasswordRequest{
		IDUser:      idUser,
		OldPassword: oldPassword,
		NewPassword: newPassword,
	}, nil
}

func (u *Usecase) ChangePassword(ctx context.Context, dto ChangePasswordRequest) error {
	ctx, span := tracing.Start(ctx, "authusecase.ChangeEmail")
	defer span.End()

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
