package authusecase

import (
	"context"
	"errors"

	"backend/internal/domain/models"
	"backend/internal/exceptions"
	"backend/internal/security"
	"backend/pkg/tracing"
)

type RecoverPasswordUpdateRequest struct {
	Email    string
	Password string
}

func NewRecoverPasswordUpdateRequest(email, password string) RecoverPasswordUpdateRequest {
	return RecoverPasswordUpdateRequest{Email: email, Password: password}
}

func (u *Usecase) RecoverPasswordUpdate(ctx context.Context, req RecoverPasswordUpdateRequest) error {
	ctx, span := tracing.Start(ctx, "authusecase.RecoverPasswordUpdate")
	defer span.End()

	data, err := u.recoverPasswordCodeService.Get(ctx, models.RecoverPasswordKey(req.Email))
	if err != nil {
		return err
	}

	// check that code was be confirmed
	if !data.IsConfirm {
		return exceptions.ErrRecoverEmailNotConfirm
	}

	// get password from db
	userCredential, err := u.userService.ReadOneUserCredentialByID(ctx, data.ID)
	if err != nil {
		return err
	}

	// check what old password not equal new password
	err = security.CheckPasswordHash(req.Password, userCredential.Credential.Salt, userCredential.Credential.PasswordHash)
	if !errors.Is(err, exceptions.ErrBadPassword) {
		return exceptions.ErrNewPasswordEqualOldPassword
	}

	// generate new credentials
	hash, salt, err := security.GenerateHashPassword(req.Password)
	if err != nil {
		return err
	}

	// update user password
	if err := u.userService.UpdatePasswordByID(ctx, data.ID, hash, salt); err != nil {
		return err
	}

	return nil
}
