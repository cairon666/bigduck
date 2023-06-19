package authusecase

import (
	"context"
	"errors"

	"backend/internal/domain/exceptions"
	validate2 "backend/internal/domain/validate"
	"backend/pkg/tracing"
)

type RecoverPasswordUpdateRequest struct {
	Email    string
	Password string
}

func NewRecoverPasswordUpdateRequest(email, password string) (RecoverPasswordUpdateRequest, error) {
	if err := validate2.Test(
		validate2.EmailSimple(email),
		validate2.PasswordSimple(password),
	); err != nil {
		return RecoverPasswordUpdateRequest{}, err
	}

	return RecoverPasswordUpdateRequest{Email: email, Password: password}, nil
}

func (u *Usecase) RecoverPasswordUpdate(ctx context.Context, req RecoverPasswordUpdateRequest) error {
	ctx, span := tracing.Start(ctx, "authusecase.RecoverPasswordUpdate")
	defer span.End()

	data, err := u.recoverPasswordCodeService.Get(ctx, req.Email)
	if err != nil {
		return err
	}

	// check that code was be confirmed
	if !data.IsConfirm {
		return exceptions.ErrRecoverEmailNotConfirm
	}

	// get password from db
	credential, err := u.credentialService.ReadByID(ctx, data.ID)
	if err != nil {
		return err
	}

	// check what old password not equal new password
	err = checkPasswordHash(req.Password, credential.Salt, credential.PasswordHash)
	if !errors.Is(err, exceptions.ErrBadPassword) {
		return exceptions.ErrNewPasswordEqualOldPassword
	}

	// generate new credentials
	hash, salt, err := generateHashPassword(req.Password)
	if err != nil {
		return err
	}

	// update user password
	if err := u.credentialService.UpdatePasswordByID(ctx, data.ID, hash, salt); err != nil {
		return err
	}

	return nil
}
