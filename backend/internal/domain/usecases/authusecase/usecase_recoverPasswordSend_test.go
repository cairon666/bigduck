package authusecase

import (
	"context"
	"errors"
	"testing"

	"backend/internal/domain/exceptions"
	"backend/internal/domain/models"
	"github.com/stretchr/testify/mock"
)

func TestRecoverPasswordSend_Success(t *testing.T) {
	t.Parallel()

	usecase, props := NewMockAuthUsecase(t)

	dto := RecoverPasswordSendRequest{
		Email: "example@example.com",
	}

	props.CredentialService.
		On("ReadByEmail", mock.Anything, dto.Email).
		Return(models.Credential{
			Email: dto.Email,
		}, nil)

	props.RecoverPasswordCodeService.
		On("Set", mock.Anything, dto.Email, mock.IsType(models.RecoverPassword{})).
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
		Email: "example@example.com",
	}

	props.CredentialService.
		On("ReadByEmail", mock.Anything, dto.Email).
		Return(models.Credential{}, exceptions.ErrNotFound)

	err := usecase.RecoverPasswordSend(context.Background(), dto)
	if !errors.Is(err, exceptions.ErrNotFound) {
		t.Fatalf("should success, err: %s", err)
	}
}
