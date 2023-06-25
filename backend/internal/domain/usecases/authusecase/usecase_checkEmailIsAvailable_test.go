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

func TestCheckEmailIsAvailable_Success(t *testing.T) {
	t.Parallel()

	usecase, params := NewMockAuthUsecase(t)

	req := CheckEmailIsAvailableRequest{
		Email: validate.MockEmail,
	}

	params.UserService.
		On("ReadByEmail", mock.Anything, req.Email).
		Return(models.User{}, exceptions.ErrNotFound)

	if err := usecase.CheckEmailIsAvailable(context.Background(), req); err != nil {
		t.Fatalf("should be success, err: %s", err)
	}
}

func TestCheckEmailIsAvailable_Internal(t *testing.T) {
	t.Parallel()

	usecase, params := NewMockAuthUsecase(t)

	req := CheckEmailIsAvailableRequest{
		Email: validate.MockEmail,
	}

	params.UserService.
		On("ReadByEmail", mock.Anything, req.Email).
		Return(models.User{}, errInternal)

	if err := usecase.CheckEmailIsAvailable(context.Background(), req); !errors.Is(err, errInternal) {
		t.Fatalf("should be internal error, err: %s", err)
	}
}

func TestCheckEmailIsAvailable_AlreadyExist(t *testing.T) {
	t.Parallel()

	usecase, params := NewMockAuthUsecase(t)

	req := CheckEmailIsAvailableRequest{
		Email: validate.MockEmail,
	}

	params.UserService.
		On("ReadByEmail", mock.Anything, req.Email).
		Return(models.User{}, nil)

	if err := usecase.CheckEmailIsAvailable(context.Background(), req); !errors.Is(err, exceptions.ErrEmailAlreadyExist) {
		t.Fatalf("should be already exist error, err: %s", err)
	}
}
