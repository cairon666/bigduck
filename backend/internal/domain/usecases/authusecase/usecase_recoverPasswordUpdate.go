package authusecase

import (
	"context"
	"errors"

	"backend/internal/domain/exceptions"
	validate2 "backend/internal/domain/validate"
)

type RecoverPasswordUpdateRequest struct {
	Email    string
	Password string
}

func (dto *RecoverPasswordUpdateRequest) IsValid() error {
	return validate2.Test(
		validate2.EmailSimple(dto.Email),
		validate2.PasswordSimple(dto.Password),
	)
}

func (u *Usecase) RecoverPasswordUpdate(ctx context.Context, req RecoverPasswordUpdateRequest) error {
	if err := req.IsValid(); err != nil {
		return err
	}

	data, err := u.recoverPasswordCodeService.Get(ctx, req.Email)
	if err != nil {
		return err
	}

	// check that code was be confirmed
	if !data.IsConfirm {
		return exceptions.ErrRecoverEmailNotConfirm
	}

	// check what old password not equal new password
	err = checkPasswordHash(req.Password, data.Salt, data.PasswordHash)
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