package authusecase

import (
	"context"
	"errors"
	"testing"

	"backend/internal/domain/models"
	"backend/internal/exceptions"
	"github.com/google/uuid"
	"github.com/stretchr/testify/mock"
)

func TestRecoverPasswordUpdate_Success(t *testing.T) {
	t.Parallel()

	usecase, props := NewMockAuthUsecase(t)

	dto := RecoverPasswordUpdateRequest{
		Email:    "example@example.com",
		Password: "12345678",
	}

	hash, salt, err := generateHashPassword("87654321")
	if err != nil {
		t.Fatal(err)
	}

	data := models.RecoverPassword{
		IsConfirm:    true,
		PasswordHash: hash,
		Salt:         salt,
		ID:           uuid.New().String(),
	}

	props.CodeService.
		On("GetCodeByEmail", mock.Anything, dto.Email).
		Return(data, nil)

	props.UserService.
		On("UpdatePasswordByID", mock.Anything, data.ID, mock.Anything, mock.Anything).
		Return(nil)

	err = usecase.RecoverPasswordUpdate(context.Background(), dto)
	if err != nil {
		t.Fatalf("should success, err: %s", err)
	}
}

func TestRecoverPasswordUpdate_EmailNotConfirm(t *testing.T) {
	t.Parallel()

	usecase, props := NewMockAuthUsecase(t)

	dto := RecoverPasswordUpdateRequest{
		Email:    "example@example.com",
		Password: "12345678",
	}

	hash, salt, err := generateHashPassword(dto.Password)
	if err != nil {
		t.Fatal(err)
	}

	data := models.RecoverPassword{
		IsConfirm:    false,
		PasswordHash: hash,
		Salt:         salt,
		ID:           uuid.New().String(),
	}

	props.CodeService.
		On("GetCodeByEmail", mock.Anything, dto.Email).
		Return(data, nil)

	err = usecase.RecoverPasswordUpdate(context.Background(), dto)
	if !errors.Is(err, exceptions.ErrRecoverEmailNotConfirm) {
		t.Fatalf("should evail not confirm err, err: %s", err)
	}
}

func TestRecoverPasswordUpdate_NewPasswordEqualOldPassword(t *testing.T) {
	t.Parallel()

	usecase, props := NewMockAuthUsecase(t)

	dto := RecoverPasswordUpdateRequest{
		Email:    "example@example.com",
		Password: "12345678",
	}

	hash, salt, err := generateHashPassword(dto.Password)
	if err != nil {
		t.Fatal(err)
	}

	data := models.RecoverPassword{
		IsConfirm:    true,
		PasswordHash: hash,
		Salt:         salt,
		ID:           uuid.New().String(),
	}

	props.CodeService.
		On("GetCodeByEmail", mock.Anything, dto.Email).
		Return(data, nil)

	err = usecase.RecoverPasswordUpdate(context.Background(), dto)
	if !errors.Is(err, exceptions.ErrNewPasswordEqualOldPassword) {
		t.Fatalf("should new password equal old password err, err: %s", err)
	}
}
