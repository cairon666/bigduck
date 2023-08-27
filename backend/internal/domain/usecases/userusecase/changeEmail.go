package userusecase

import (
	"context"

	"backend/internal/exceptions"
	"backend/pkg/tracing"
	"github.com/google/uuid"
)

type ChangeEmailRequest struct {
	IDUser uuid.UUID
	Email  string
}

func NewChangeEmailRequest(idUser uuid.UUID, email string) ChangeEmailRequest {
	return ChangeEmailRequest{
		IDUser: idUser,
		Email:  email,
	}
}

func (u *Usecase) ChangeEmail(ctx context.Context, dto ChangeEmailRequest) error {
	ctx, span := tracing.Start(ctx, "userusecase.ChangeEmail")
	defer span.End()

	user, err := u.userService.ReadOneUserByID(ctx, dto.IDUser)
	if err != nil {
		return err
	}

	if user.Email == dto.Email {
		return exceptions.ErrNewEmailEqualOldEmail
	}

	if err := u.userService.UpdateEmailByID(ctx, dto.IDUser, dto.Email); err != nil {
		return err
	}

	return nil
}
