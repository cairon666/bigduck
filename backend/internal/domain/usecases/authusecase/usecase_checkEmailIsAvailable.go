package authusecase

import (
	"context"
	"errors"

	"backend/internal/domain/exceptions"
)

type CheckEmailIsAvailableRequest struct {
	Email string
}

func (dto *CheckEmailIsAvailableRequest) IsValid() error {
	return nil
}

func (u *Usecase) CheckEmailIsAvailable(ctx context.Context, dto CheckEmailIsAvailableRequest) error {
	if err := dto.IsValid(); err != nil {
		return err
	}

	_, err := u.credentialService.ReadByEmail(ctx, dto.Email)

	if err == nil {
		return exceptions.ErrEmailAlreadyExist
	}

	if !errors.Is(err, exceptions.ErrNotFound) {
		return err
	}

	return nil
}
