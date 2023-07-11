package authusecase

import (
	"context"

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
	ctx, span := tracing.Start(ctx, "authusecase.ChangeEmail")
	defer span.End()

	_, err := u.userService.ReadOneUserByID(ctx, dto.IDUser)
	if err != nil {
		return err
	}

	if err := u.userService.UpdateEmailByID(ctx, dto.IDUser, dto.Email); err != nil {
		return err
	}

	u.mailService.SendEmailWasUpdate(ctx, dto.Email)

	return nil
}
