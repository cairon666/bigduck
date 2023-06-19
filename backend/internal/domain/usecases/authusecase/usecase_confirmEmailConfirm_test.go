package authusecase

import (
	"context"
	"errors"
	"testing"

	"backend/internal/domain/exceptions"
	"github.com/google/uuid"
	"github.com/stretchr/testify/mock"
)

func TestConfirmEmailConfirm_Success(t *testing.T) {
	t.Parallel()

	usecase, params := NewMockAuthUsecase(t)

	req := ConfirmEmailConfirmRequest{
		IDUser: uuid.New().String(),
		Code:   "0000",
	}

	code := req.Code

	params.ConfirmEmailCodeService.
		On("Get", mock.Anything, req.IDUser).
		Return(code, nil)

	params.CredentialService.
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
		IDUser: uuid.New().String(),
		Code:   "0000",
	}

	code := "0001"

	params.ConfirmEmailCodeService.
		On("Get", mock.Anything, req.IDUser).
		Return(code, nil)

	if err := usecase.ConfirmEmailConfirm(context.Background(), req); !errors.Is(err, exceptions.ErrBadEmailConfirmCode) {
		t.Fatalf("should be bad code, err: %s", err)
	}
}
