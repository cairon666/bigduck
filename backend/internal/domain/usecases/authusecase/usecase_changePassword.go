package authusecase

import (
	"context"

	"backend/internal/exceptions"
	"backend/pkg/tracing"
	"github.com/google/uuid"
)

type ChangePasswordRequest struct {
	IDUser      uuid.UUID
	OldPassword string
	NewPassword string
}

func NewChangePasswordRequest(idUser uuid.UUID, oldPassword, newPassword string) ChangePasswordRequest {
	return ChangePasswordRequest{
		IDUser:      idUser,
		OldPassword: oldPassword,
		NewPassword: newPassword,
	}
}

func (u *Usecase) ChangePassword(ctx context.Context, dto ChangePasswordRequest) error {
	ctx, span := tracing.Start(ctx, "authusecase.ChangePassword")
	defer span.End()

	userCredential, err := u.userService.ReadOneUserCredentialByID(ctx, dto.IDUser)
	if err != nil {
		return err
	}

	err = checkPasswordHash(dto.OldPassword, userCredential.Credential.Salt, userCredential.Credential.PasswordHash)
	if err != nil {
		return exceptions.ErrWrongOldPassword
	}

	hash, salt, err := generateHashPassword(dto.NewPassword)
	if err != nil {
		return err
	}

	if err := u.userService.UpdatePasswordByID(ctx, dto.IDUser, hash, salt); err != nil {
		return err
	}

	u.mailService.SendPasswordWasUpdate(ctx, userCredential.User.Email)

	return nil
}
