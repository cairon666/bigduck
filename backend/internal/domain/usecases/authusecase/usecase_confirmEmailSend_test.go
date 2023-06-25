package authusecase

import (
	"context"
	"errors"
	"testing"

	"backend/internal/domain/models"
	"backend/internal/domain/validate"
	"backend/internal/exceptions"
	"github.com/stretchr/testify/mock"
)

func TestConfirmEmailSend_Success(t *testing.T) {
	t.Parallel()

	usecase, params := NewMockAuthUsecase(t)

	req := ConfirmEmailSendRequest{
		IDUser: validate.MockUUID,
	}

	user := models.User{
		Email: validate.MockEmail,
	}

	params.UserService.
		On("ReadByID", mock.Anything, req.IDUser).
		Return(user, nil)

	params.ConfirmEmailCodeService.
		On("Set", mock.Anything, mock.IsType(&models.ConfirmEmailCode{}), mock.AnythingOfType("time.Duration")).
		Return(nil)

	params.MailService.
		On("SendEmailConfirmCode", mock.Anything, user.Email, mock.IsType("")).
		Return()

	if err := usecase.ConfirmEmailSend(context.Background(), req); err != nil {
		t.Fatalf("should be success, err: %s", err)
	}
}

func TestConfirmEmailSend_NotFound(t *testing.T) {
	t.Parallel()

	usecase, params := NewMockAuthUsecase(t)

	req := ConfirmEmailSendRequest{
		IDUser: validate.MockUUID,
	}

	params.UserService.
		On("ReadByID", mock.Anything, req.IDUser).
		Return(models.User{}, exceptions.ErrNotFound)

	if err := usecase.ConfirmEmailSend(context.Background(), req); !errors.Is(err, exceptions.ErrNotFound) {
		t.Fatalf("should be success, err: %s", err)
	}
}
