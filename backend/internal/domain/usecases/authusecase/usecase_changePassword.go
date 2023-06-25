package authusecase

import (
	"context"

	"backend/internal/domain/validate"
	"backend/internal/exceptions"
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
		validate.NewPasswordSimple(newPassword),
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
	ctx, span := tracing.Start(ctx, "authusecase.ChangePassword")
	defer span.End()

	credentials, err := u.userService.ReadByID(ctx, dto.IDUser)
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

	if err := u.userService.UpdatePasswordByID(ctx, dto.IDUser, hash, salt); err != nil {
		return err
	}

	u.mailService.SendPasswordWasUpdate(ctx, credentials.Email)

	return nil
}
