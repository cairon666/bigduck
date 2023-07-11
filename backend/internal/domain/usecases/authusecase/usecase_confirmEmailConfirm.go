package authusecase

import (
	"context"

	"backend/internal/domain/models"
	"backend/internal/exceptions"
	"backend/pkg/tracing"
	"github.com/google/uuid"
)

type ConfirmEmailConfirmRequest struct {
	IDUser uuid.UUID
	Code   string
}

func NewConfirmEmailConfirmRequest(idUser uuid.UUID, code string) ConfirmEmailConfirmRequest {
	return ConfirmEmailConfirmRequest{
		IDUser: idUser,
		Code:   code,
	}
}

func (u *Usecase) ConfirmEmailConfirm(ctx context.Context, dto ConfirmEmailConfirmRequest) error {
	ctx, span := tracing.Start(ctx, "authusecase.ConfirmEmailConfirm")
	defer span.End()

	resp, err := u.confirmEmailCodeService.Get(ctx, models.ConfirmEmailCodeKey(dto.IDUser))
	if err != nil {
		return err
	}

	if resp.Code != dto.Code {
		return exceptions.ErrBadEmailConfirmCode
	}

	if err := u.userService.ConfirmEmailByID(ctx, dto.IDUser); err != nil {
		return err
	}

	return nil
}
