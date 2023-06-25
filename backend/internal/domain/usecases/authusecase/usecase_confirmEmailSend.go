package authusecase

import (
	"context"
	"time"

	"backend/internal/domain/models"
	"backend/internal/domain/validate"
	"backend/pkg/tracing"
)

var (
	ttlConfirmEmail = time.Minute * 5
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

	credential, err := u.userService.ReadByID(ctx, dto.IDUser)
	if err != nil {
		return err
	}

	code, err := generateCode()
	if err != nil {
		return err
	}

	req := models.NewConfirmEmailCode(code, dto.IDUser)
	if err := u.confirmEmailCodeService.Set(ctx, req, ttlConfirmEmail); err != nil {
		return err
	}

	u.mailService.SendEmailConfirmCode(ctx, credential.Email, code)

	return nil
}
