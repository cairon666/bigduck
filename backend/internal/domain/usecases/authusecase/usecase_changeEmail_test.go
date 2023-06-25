package authusecase

import (
	"context"
	"testing"

	"backend/internal/domain/models"
	"backend/internal/domain/validate"
	"backend/internal/exceptions"
	"github.com/pkg/errors"
	"github.com/stretchr/testify/mock"
)

func TestChangeEmail_Success(t *testing.T) {
	t.Parallel()

	usecase, params := NewMockAuthUsecase(t)

	req := ChangeEmailRequest{
		IDUser: validate.MockUUID,
		Email:  validate.MockEmail,
	}

	user := models.User{Email: req.Email, ID: req.IDUser}

	params.UserService.
		On("ReadByID", mock.Anything, req.IDUser).
		Return(user, nil)

	params.UserService.
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
		IDUser: validate.MockUUID,
		Email:  validate.MockEmail,
	}

	user := models.User{Email: req.Email, ID: req.IDUser}

	params.UserService.
		On("ReadByID", mock.Anything, req.IDUser).
		Return(user, exceptions.ErrNotFound)

	err := usecase.ChangeEmail(context.Background(), req)
	if !errors.Is(err, exceptions.ErrNotFound) {
		t.Fatalf("should be not found, err: %s", err)
	}
}
