package userusecase

import (
	"context"
	"time"

	"backend/internal/domain/models"
	"backend/internal/security"
	"backend/pkg/tracing"
	"github.com/google/uuid"
)

var ttlconfirmEmailCode = time.Minute * 5

type ConfirmEmailSendRequest struct {
	IDUser uuid.UUID
}

func NewConfirmEmailSendRequest(idUser uuid.UUID) ConfirmEmailSendRequest {
	return ConfirmEmailSendRequest{
		IDUser: idUser,
	}
}

func (u *Usecase) ConfirmEmailSend(ctx context.Context, dto ConfirmEmailSendRequest) error {
	ctx, span := tracing.Start(ctx, "userusecase.ConfirmEmailSend")
	defer span.End()

	// check what user is existed
	user, err := u.userService.ReadOneUserByID(ctx, dto.IDUser)
	if err != nil {
		return err
	}

	code, err := security.GenerateCode()
	if err != nil {
		return err
	}

	if err := u.confirmEmailCodeService.Set(
		ctx,
		models.NewConfirmEmailCode(code, dto.IDUser),
		ttlconfirmEmailCode,
	); err != nil {
		return err
	}

	u.mailService.SendEmailConfirmCode(ctx, user.Email, code)

	return nil
}
