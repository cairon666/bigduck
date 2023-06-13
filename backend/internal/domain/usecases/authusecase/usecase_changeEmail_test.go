package authusecase

import (
	"context"
	"testing"

	"backend/internal/domain/exceptions"
	"backend/internal/domain/models"
	"github.com/google/uuid"
	"github.com/pkg/errors"
	"github.com/stretchr/testify/mock"
)

func TestChangeEmail_Success(t *testing.T) {
	t.Parallel()

	usecase, params := NewMockAuthUsecase(t)

	req := ChangeEmailRequest{
		IDUser: uuid.New().String(),
		Email:  "example@example.example",
	}

	params.CredentialService.
		On("ReadByEmail", mock.Anything, req.Email).
		Return(models.Credential{}, nil)

	params.CredentialService.
		On("UpdateEmailByID", mock.Anything, req.IDUser, req.Email).
		Return(nil)

	params.MailService.
		On("SendEmailWasUpdate", mock.Anything, req.Email)

	err := usecase.ChangeEmail(context.Background(), req)
	if err != nil {
		t.Fatalf("should be success, err: %s", err)
	}
}

func TestChangeEmail_NotFound(t *testing.T) {
	t.Parallel()

	usecase, params := NewMockAuthUsecase(t)

	req := ChangeEmailRequest{
		IDUser: uuid.New().String(),
		Email:  "example@example.example",
	}

	params.CredentialService.
		On("ReadByEmail", mock.Anything, req.Email).
		Return(models.Credential{}, exceptions.ErrNotFound)

	err := usecase.ChangeEmail(context.Background(), req)
	if !errors.Is(err, exceptions.ErrNotFound) {
		t.Fatalf("should be not found, err: %s", err)
	}
}
