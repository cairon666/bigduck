package authusecase

import (
	"context"

	"backend/internal/domain/validate"
	"backend/pkg/tracing"
)

type ChangeEmailRequest struct {
	IDUser string
	Email  string
}

func NewChangeEmailRequest(idUser, email string) (ChangeEmailRequest, error) {
	if err := validate.Test(
		validate.UUIDSimple(idUser),
		validate.EmailSimple(email),
	); err != nil {
		return ChangeEmailRequest{}, err
	}

	return ChangeEmailRequest{
		IDUser: idUser,
		Email:  email,
	}, nil
}

func (u *Usecase) ChangeEmail(ctx context.Context, dto ChangeEmailRequest) error {
	ctx, span := tracing.Start(ctx, "authusecase.ChangeEmail")
	defer span.End()

	_, err := u.userService.ReadByID(ctx, dto.IDUser)
	if err != nil {
		return err
	}

	if err := u.userService.UpdateEmailByID(ctx, dto.IDUser, dto.Email); err != nil {
		return err
	}

	u.mailService.SendEmailWasUpdate(ctx, dto.Email)

	return nil
}
