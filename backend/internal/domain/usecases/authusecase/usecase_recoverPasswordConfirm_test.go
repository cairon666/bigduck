package authusecase

import (
	"context"
	"errors"
	"testing"

	"backend/internal/domain/exceptions"
	"backend/internal/domain/models"
	"github.com/stretchr/testify/mock"
)

func TestRecoverPasswordConfirm_Success(t *testing.T) {
	t.Parallel()

	usecase, props := NewMockAuthUsecase(t)

	dto := RecoverPasswordConfirmRequest{
		Email: "example@example.com",
		Code:  "0000",
	}

	recoverData := models.NewRecoverPassword(dto.Email, "", false, dto.Code)

	props.RecoverPasswordCodeService.
		On("Get", mock.Anything, dto.Email).
		Return(recoverData, nil)

	props.RecoverPasswordCodeService.
		On("Set", mock.Anything, dto.Email, mock.IsType(models.RecoverPassword{})).
		Return(nil)

	err := usecase.RecoverPasswordConfirm(context.Background(), dto)
	if err != nil {
		t.Fatalf("should success, err: %s", err)
	}
}

func TestRecoverPasswordConfirm_BadRecoverCode(t *testing.T) {
	t.Parallel()

	usecase, props := NewMockAuthUsecase(t)

	dto := RecoverPasswordConfirmRequest{
		Email: "example@example.com",
		Code:  "0000",
	}

	recoverData := models.NewRecoverPassword(dto.Email, "", false, "0001")

	props.RecoverPasswordCodeService.
		On("Get", mock.Anything, dto.Email).
		Return(recoverData, nil)

	err := usecase.RecoverPasswordConfirm(context.Background(), dto)
	if !errors.Is(err, exceptions.ErrBadRecoverCode) {
		t.Fatalf("should err bad recover code, err: %s", err)
	}
}

func TestRecoverPasswordConfirm_EmailNotFound(t *testing.T) {
	t.Parallel()

	usecase, props := NewMockAuthUsecase(t)

	dto := RecoverPasswordConfirmRequest{
		Email: "example@example.com",
		Code:  "0000",
	}

	recoverData := models.NewRecoverPassword(dto.Email, "", false, dto.Code)

	props.RecoverPasswordCodeService.
		On("Get", mock.Anything, dto.Email).
		Return(recoverData, exceptions.ErrNotFound)

	err := usecase.RecoverPasswordConfirm(context.Background(), dto)
	if !errors.Is(err, exceptions.ErrNotFound) {
		t.Fatalf("should err not found, err: %s", err)
	}
}
