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

func TestChangePassword_Success(t *testing.T) {
	t.Parallel()

	usecase, params := NewMockAuthUsecase(t)

	req := ChangePasswordRequest{
		IDUser:      validate.MockUUID,
		OldPassword: validate.MockPassword,
		NewPassword: validate.MockPassword2,
	}

	hash, salt, err := generateHashPassword(req.OldPassword)
	if err != nil {
		t.Fatalf("genereate password error: %s", err)
	}

	user := models.User{
		ID:             req.IDUser,
		Email:          validate.MockEmail,
		EmailIsConfirm: false,
		PasswordHash:   hash,
		Salt:           salt,
	}

	params.UserService.
		On("ReadByID", mock.Anything, req.IDUser).
		Return(user, nil)

	params.UserService.
		On("UpdatePasswordByID", mock.Anything, req.IDUser, mock.IsType(""), mock.IsType("")).
		Return(nil)

	params.MailService.
		On("SendPasswordWasUpdate", mock.Anything, user.Email).
		Return(nil)

	if err := usecase.ChangePassword(context.Background(), req); err != nil {
		t.Fatalf("should be success, err: %s", err)
	}
}

func TestChangePassword_WrongOldPassword(t *testing.T) {
	t.Parallel()

	usecase, params := NewMockAuthUsecase(t)

	req := ChangePasswordRequest{
		IDUser:      validate.MockUUID,
		OldPassword: validate.MockPassword,
		NewPassword: validate.MockPassword2,
	}

	hash, salt, err := generateHashPassword("87654321")
	if err != nil {
		t.Fatalf("genereate password error: %s", err)
	}

	user := models.User{
		ID:             req.IDUser,
		Email:          validate.MockEmail,
		EmailIsConfirm: false,
		PasswordHash:   hash,
		Salt:           salt,
	}

	params.UserService.
		On("ReadByID", mock.Anything, req.IDUser).
		Return(user, nil)

	if err := usecase.ChangePassword(context.Background(), req); !errors.Is(err, exceptions.ErrWrongOldPassword) {
		t.Fatalf("should be wrong old password, err: %s", err)
	}
}
