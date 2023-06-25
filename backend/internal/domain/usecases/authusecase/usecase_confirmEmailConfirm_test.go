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

func TestConfirmEmailConfirm_Success(t *testing.T) {
	t.Parallel()

	usecase, params := NewMockAuthUsecase(t)

	req := ConfirmEmailConfirmRequest{
		IDUser: validate.MockUUID,
		Code:   validate.MockCode,
	}

	cec := models.NewConfirmEmailCode(req.Code, req.IDUser)

	key := models.ConfirmEmailCodeKey(req.IDUser)

	params.ConfirmEmailCodeService.
		On("Get", mock.Anything, key).
		Return(cec, nil)

	params.UserService.
		On("ConfirmEmailByID", mock.Anything, req.IDUser).
		Return(nil)

	if err := usecase.ConfirmEmailConfirm(context.Background(), req); err != nil {
		t.Fatalf("should be success, err: %s", err)
	}
}

func TestConfirmEmailConfirm_BadCode(t *testing.T) {
	t.Parallel()

	usecase, params := NewMockAuthUsecase(t)

	req := ConfirmEmailConfirmRequest{
		IDUser: validate.MockUUID,
		Code:   validate.MockCode,
	}

	cec := models.NewConfirmEmailCode(validate.MockCode2, req.Code)

	key := models.ConfirmEmailCodeKey(req.IDUser)

	params.ConfirmEmailCodeService.
		On("Get", mock.Anything, key).
		Return(cec, nil)

	if err := usecase.ConfirmEmailConfirm(context.Background(), req); !errors.Is(err, exceptions.ErrBadEmailConfirmCode) {
		t.Fatalf("should be bad code, err: %s", err)
	}
}
