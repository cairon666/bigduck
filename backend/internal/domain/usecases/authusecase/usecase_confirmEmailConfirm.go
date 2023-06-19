package authusecase

import (
	"context"

	"backend/internal/domain/exceptions"
	"backend/internal/domain/validate"
	"backend/pkg/tracing"
)

type ConfirmEmailConfirmRequest struct {
	IDUser string
	Code   string
}

func NewConfirmEmailConfirmRequest(idUser, code string) (ConfirmEmailConfirmRequest, error) {
	if err := validate.Test(
		validate.UUIDSimple(idUser),
		validate.ConfirmEmailCodeSimple(code),
	); err != nil {
		return ConfirmEmailConfirmRequest{}, err
	}

	return ConfirmEmailConfirmRequest{
		IDUser: idUser,
		Code:   code,
	}, nil
}

func (u *Usecase) ConfirmEmailConfirm(ctx context.Context, dto ConfirmEmailConfirmRequest) error {
	ctx, span := tracing.Start(ctx, "authusecase.ConfirmEmailConfirm")
	defer span.End()

	code, err := u.confirmEmailCodeService.Get(ctx, dto.IDUser)
	if err != nil {
		return err
	}

	if code != dto.Code {
		return exceptions.ErrBadEmailConfirmCode
	}

	if err := u.credentialService.ConfirmEmailByID(ctx, dto.IDUser); err != nil {
		return err
	}

	return nil
}
