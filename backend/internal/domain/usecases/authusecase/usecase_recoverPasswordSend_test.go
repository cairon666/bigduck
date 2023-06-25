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

func TestRecoverPasswordSend_Success(t *testing.T) {
	t.Parallel()

	usecase, props := NewMockAuthUsecase(t)

	dto := RecoverPasswordSendRequest{
		Email: validate.MockEmail,
	}

	user := models.User{Email: dto.Email}

	props.UserService.
		On("ReadByEmail", mock.Anything, dto.Email).
		Return(user, nil)

	props.RecoverPasswordCodeService.
		On("Set", mock.Anything, mock.IsType(&models.RecoverPassword{}), mock.AnythingOfType("time.Duration")).
		Return(nil)

	props.MailService.
		On("SendRecoverPasswordCode", mock.Anything, dto.Email, mock.IsType("")).
		Return(nil)

	err := usecase.RecoverPasswordSend(context.Background(), dto)
	if err != nil {
		t.Fatalf("should success, err: %s", err)
	}
}

func TestRecoverPasswordSend_EmailNotExist(t *testing.T) {
	t.Parallel()

	usecase, props := NewMockAuthUsecase(t)

	dto := RecoverPasswordSendRequest{
		Email: validate.MockEmail,
	}

	props.UserService.
		On("ReadByEmail", mock.Anything, dto.Email).
		Return(models.User{}, exceptions.ErrNotFound)

	err := usecase.RecoverPasswordSend(context.Background(), dto)
	if !errors.Is(err, exceptions.ErrNotFound) {
		t.Fatalf("should success, err: %s", err)
	}
}
