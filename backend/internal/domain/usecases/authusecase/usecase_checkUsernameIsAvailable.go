package authusecase

import (
	"context"
	"errors"

	"backend/internal/domain/validate"
	"backend/internal/exceptions"
	"backend/pkg/tracing"
)

type CheckUsernameIsAvailableRequest struct {
	Username string
}

func NewCheckUsernameIsAvailableRequest(username string) (CheckUsernameIsAvailableRequest, error) {
	if err := validate.Test(validate.UserNameSimple(username)); err != nil {
		return CheckUsernameIsAvailableRequest{}, err
	}

	return CheckUsernameIsAvailableRequest{
		Username: username,
	}, nil
}

func (u *Usecase) CheckUsernameIsAvailable(ctx context.Context, dto CheckUsernameIsAvailableRequest) error {
	ctx, span := tracing.Start(ctx, "authusecase.CheckUsernameIsAvailable")
	defer span.End()

	_, err := u.userService.ReadByUsername(ctx, dto.Username)

	if err == nil {
		return exceptions.ErrUsernameAlreadyExist
	}

	if !errors.Is(err, exceptions.ErrNotFound) {
		return err
	}

	return nil
}
