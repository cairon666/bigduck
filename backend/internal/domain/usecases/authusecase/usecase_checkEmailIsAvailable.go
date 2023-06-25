package authusecase

import (
	"context"
	"errors"

	"backend/internal/domain/validate"
	"backend/internal/exceptions"
	"backend/pkg/tracing"
)

type CheckEmailIsAvailableRequest struct {
	Email string
}

func NewCheckEmailIsAvailableRequest(email string) (CheckEmailIsAvailableRequest, error) {
	if err := validate.Test(validate.EmailSimple(email)); err != nil {
		return CheckEmailIsAvailableRequest{}, err
	}

	return CheckEmailIsAvailableRequest{
		Email: email,
	}, nil
}

func (u *Usecase) CheckEmailIsAvailable(ctx context.Context, dto CheckEmailIsAvailableRequest) error {
	ctx, span := tracing.Start(ctx, "authusecase.CheckEmailIsAvailable")
	defer span.End()

	_, err := u.userService.ReadByEmail(ctx, dto.Email)

	if err == nil {
		return exceptions.ErrEmailAlreadyExist
	}

	if !errors.Is(err, exceptions.ErrNotFound) {
		return err
	}

	return nil
}
