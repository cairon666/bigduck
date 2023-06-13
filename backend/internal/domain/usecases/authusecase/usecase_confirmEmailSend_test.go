package authusecase

import (
	"context"
	"errors"
	"testing"

	"backend/internal/domain/exceptions"
	"backend/internal/domain/models"
	"github.com/google/uuid"
	"github.com/stretchr/testify/mock"
)

func TestConfirmEmailSend_Success(t *testing.T) {
	t.Parallel()

	usecase, params := NewMockAuthUsecase(t)

	req := ConfirmEmailSendRequest{
		IDUser: uuid.New().String(),
	}

	data := models.Credential{
		Email: "example@exmple.com",
	}

	params.CredentialService.
		On("ReadByID", mock.Anything, req.IDUser).
		Return(data, nil)

	params.ConfirmEmailCodeService.
		On("Set", mock.Anything, req.IDUser, mock.IsType(models.ConfirmEmail{})).
		Return(nil)

	params.MailService.
		On("SendEmailConfirmCode", mock.Anything, data.Email, mock.IsType("")).
		Return()

	if err := usecase.ConfirmEmailSend(context.Background(), req); err != nil {
		t.Fatalf("should be success, err: %s", err)
	}
}

func TestConfirmEmailSend_NotFound(t *testing.T) {
	t.Parallel()

	usecase, params := NewMockAuthUsecase(t)

	req := ConfirmEmailSendRequest{
		IDUser: uuid.New().String(),
	}

	params.CredentialService.
		On("ReadByID", mock.Anything, req.IDUser).
		Return(models.Credential{}, exceptions.ErrNotFound)

	if err := usecase.ConfirmEmailSend(context.Background(), req); !errors.Is(err, exceptions.ErrNotFound) {
		t.Fatalf("should be success, err: %s", err)
	}
}
