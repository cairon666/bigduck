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

func TestChangePassword_Success(t *testing.T) {
	t.Parallel()

	usecase, params := NewMockAuthUsecase(t)

	req := ChangePasswordRequest{
		IDUser:      uuid.New().String(),
		OldPassword: "12345678",
		NewPassword: "qwertyuii",
	}

	hash, salt, err := generateHashPassword(req.OldPassword)
	if err != nil {
		t.Fatalf("genereate password error: %s", err)
	}

	credentials := models.NewCredential(req.IDUser, "example@example.example", false, hash, salt)

	params.CredentialService.
		On("ReadByID", mock.Anything, req.IDUser).
		Return(credentials, nil)

	params.CredentialService.
		On("UpdatePasswordByID", mock.Anything, req.IDUser, mock.IsType(""), mock.IsType("")).
		Return(nil)

	params.MailService.
		On("SendPasswordWasUpdate", mock.Anything, credentials.Email).
		Return(nil)

	if err := usecase.ChangePassword(context.Background(), req); err != nil {
		t.Fatalf("should be success, err: %s", err)
	}
}

func TestChangePassword_WrongOldPassword(t *testing.T) {
	t.Parallel()

	usecase, params := NewMockAuthUsecase(t)

	req := ChangePasswordRequest{
		IDUser:      uuid.New().String(),
		OldPassword: "12345678",
		NewPassword: "qwertyuii",
	}

	hash, salt, err := generateHashPassword("87654321")
	if err != nil {
		t.Fatalf("genereate password error: %s", err)
	}

	credentials := models.NewCredential(req.IDUser, "example@example.example", false, hash, salt)

	params.CredentialService.
		On("ReadByID", mock.Anything, req.IDUser).
		Return(credentials, nil)

	if err := usecase.ChangePassword(context.Background(), req); !errors.Is(err, exceptions.ErrWrongOldPassword) {
		t.Fatalf("should be wrong old password, err: %s", err)
	}
}
