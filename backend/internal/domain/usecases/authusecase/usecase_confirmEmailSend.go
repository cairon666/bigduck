package authusecase

import (
	"context"
	"time"

	"backend/internal/domain/models"
	"backend/pkg/tracing"
	"github.com/google/uuid"
)

var (
	ttlConfirmEmail = time.Minute * 5
)

type ConfirmEmailSendRequest struct {
	IDUser uuid.UUID
}

func NewConfirmEmailSendRequest(idUser uuid.UUID) ConfirmEmailSendRequest {
	return ConfirmEmailSendRequest{
		IDUser: idUser,
	}
}

func (u *Usecase) ConfirmEmailSend(ctx context.Context, dto ConfirmEmailSendRequest) error {
	ctx, span := tracing.Start(ctx, "authusecase.ConfirmEmailSend")
	defer span.End()

	user, err := u.userService.ReadOneUserByID(ctx, dto.IDUser)
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

	u.mailService.SendEmailConfirmCode(ctx, user.Email, code)

	return nil
}
