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

func TestRecoverPasswordConfirm_Success(t *testing.T) {
	t.Parallel()

	usecase, props := NewMockAuthUsecase(t)

	dto := RecoverPasswordConfirmRequest{
		Email: validate.MockEmail,
		Code:  validate.MockCode,
	}

	recoverData := models.NewRecoverPassword(dto.Email, "", false, dto.Code)

	key := models.RecoverPasswordKey(dto.Email)

	props.RecoverPasswordCodeService.
		On("Get", mock.Anything, key).
		Return(recoverData, nil)

	props.RecoverPasswordCodeService.
		On("Set", mock.Anything, mock.IsType(&models.RecoverPassword{}), ttlRecoverPasswordCode).
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
		Email: validate.MockEmail,
		Code:  validate.MockCode,
	}

	recoverData := models.NewRecoverPassword(dto.Email, "", false, validate.MockCode2)

	key := models.RecoverPasswordKey(dto.Email)

	props.RecoverPasswordCodeService.
		On("Get", mock.Anything, key).
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
		Email: validate.MockEmail,
		Code:  validate.MockCode,
	}

	recoverData := models.NewRecoverPassword(dto.Email, "", false, dto.Code)

	key := models.RecoverPasswordKey(dto.Email)

	props.RecoverPasswordCodeService.
		On("Get", mock.Anything, key).
		Return(recoverData, exceptions.ErrNotFound)

	err := usecase.RecoverPasswordConfirm(context.Background(), dto)
	if !errors.Is(err, exceptions.ErrNotFound) {
		t.Fatalf("should err not found, err: %s", err)
	}
}
