package authusecase

import (
	"context"
	"errors"
	"testing"

	"backend/internal/domain/models"
	"backend/internal/exceptions"
	"github.com/stretchr/testify/mock"
)

func TestRecoverPasswordConfirm_Success(t *testing.T) {
	t.Parallel()

	usecase, props := NewMockAuthUsecase(t)

	dto := RecoverPasswordConfirmRequest{
		Email: "example@example.com",
		Code:  "0000",
	}

	props.CodeService.
		On("GetCodeByEmail", mock.Anything, dto.Email).
		Return(models.RecoverPassword{
			IsConfirm: false,
			Code:      dto.Code,
		}, nil)

	props.CodeService.
		On("SetCode", mock.Anything, mock.MatchedBy(func(data models.RecoverPassword) bool {
			return data.IsConfirm == true
		})).
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

	props.CodeService.
		On("GetCodeByEmail", mock.Anything, dto.Email).
		Return(models.RecoverPassword{
			IsConfirm: false,
			Code:      "0001",
		}, nil)

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

	props.CodeService.
		On("GetCodeByEmail", mock.Anything, dto.Email).
		Return(models.RecoverPassword{
			IsConfirm: false,
			Code:      dto.Code,
		}, exceptions.ErrNotFound)

	err := usecase.RecoverPasswordConfirm(context.Background(), dto)
	if !errors.Is(err, exceptions.ErrNotFound) {
		t.Fatalf("should err not found, err: %s", err)
	}
}
