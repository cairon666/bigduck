package authusecase

import (
	"context"
	"errors"
	"testing"

	"backend/internal/domain/models"
	"backend/internal/exceptions"
	"github.com/stretchr/testify/mock"
)

func TestRecoverPasswordSend_Success(t *testing.T) {
	t.Parallel()

	usecase, props := NewMockAuthUsecase(t)

	dto := RecoverPasswordSendRequest{
		Email: "example@example.com",
	}

	props.UserService.
		On("ReadByEmail", mock.Anything, dto.Email).
		Return(models.User{}, nil)

	props.CodeService.
		On("SetCode", mock.Anything, mock.Anything).
		Return(nil)

	props.MailService.
		On("SendRecoverPasswordCode", mock.Anything, mock.Anything).
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
		Email: "example@example.com",
	}

	props.UserService.
		On("ReadByEmail", mock.Anything, dto.Email).
		Return(models.User{}, exceptions.ErrNotFound)

	err := usecase.RecoverPasswordSend(context.Background(), dto)
	if !errors.Is(err, exceptions.ErrNotFound) {
		t.Fatalf("should success, err: %s", err)
	}
}
