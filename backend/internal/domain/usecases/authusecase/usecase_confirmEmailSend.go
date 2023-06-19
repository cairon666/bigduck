package authusecase

import (
	"context"

	"backend/internal/domain/validate"
	"backend/pkg/tracing"
)

type ConfirmEmailSendRequest struct {
	IDUser string
}

func NewConfirmEmailSendRequest(idUser string) (ConfirmEmailSendRequest, error) {
	if err := validate.Test(
		validate.UUIDSimple(idUser),
	); err != nil {
		return ConfirmEmailSendRequest{}, err
	}

	return ConfirmEmailSendRequest{
		IDUser: idUser,
	}, nil
}

func (u *Usecase) ConfirmEmailSend(ctx context.Context, dto ConfirmEmailSendRequest) error {
	ctx, span := tracing.Start(ctx, "authusecase.ConfirmEmailSend")
	defer span.End()

	credential, err := u.credentialService.ReadByID(ctx, dto.IDUser)
	if err != nil {
		return err
	}

	code, err := generateCode()
	if err != nil {
		return err
	}

	if err := u.confirmEmailCodeService.Set(ctx, dto.IDUser, code); err != nil {
		return err
	}

	u.mailService.SendEmailConfirmCode(ctx, credential.Email, code)

	return nil
}
