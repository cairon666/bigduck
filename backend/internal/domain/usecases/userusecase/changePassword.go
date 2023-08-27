package userusecase

import (
	"context"
	"errors"

	"backend/internal/exceptions"
	"backend/internal/security"
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
	ctx, span := tracing.Start(ctx, "userusecase.ChangePassword")
	defer span.End()

	userCredential, err := u.userService.ReadOneUserCredentialByID(ctx, dto.IDUser)
	if err != nil {
		return err
	}

	// check old password
	if err = security.CheckPasswordHash(
		dto.OldPassword,
		userCredential.Credential.Salt,
		userCredential.Credential.PasswordHash,
	); err != nil {
		return exceptions.ErrWrongOldPassword
	}

	// check what old password not equal new password
	if err := security.CheckPasswordHash(
		dto.NewPassword,
		userCredential.Credential.Salt,
		userCredential.Credential.PasswordHash,
	); !errors.Is(err, exceptions.ErrBadPassword) {
		return exceptions.ErrNewPasswordEqualOldPassword
	}

	hash, salt, err := security.GenerateHashPassword(dto.NewPassword)
	if err != nil {
		return err
	}

	if err := u.userService.UpdatePasswordByID(ctx, dto.IDUser, hash, salt); err != nil {
		return err
	}

	return nil
}
