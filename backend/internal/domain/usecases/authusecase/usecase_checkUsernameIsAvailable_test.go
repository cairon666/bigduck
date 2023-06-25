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

func TestCheckUsernameIsAvailable_Success(t *testing.T) {
	t.Parallel()

	usecase, params := NewMockAuthUsecase(t)
	ctx := context.Background()

	req, err := NewCheckUsernameIsAvailableRequest(validate.MockUserName)
	if err != nil {
		t.Fatal(err)
	}

	params.UserService.
		On("ReadByUsername", mock.Anything, req.Username).
		Return(models.User{}, exceptions.ErrNotFound)

	if err := usecase.CheckUsernameIsAvailable(ctx, req); err != nil {
		t.Fatalf("should be success: %e", err)
	}
}

func TestCheckUsernameIsAvailable_AlreadyExist(t *testing.T) {
	t.Parallel()

	usecase, params := NewMockAuthUsecase(t)
	ctx := context.Background()

	req, err := NewCheckUsernameIsAvailableRequest(validate.MockUserName)
	if err != nil {
		t.Fatal(err)
	}

	params.UserService.
		On("ReadByUsername", mock.Anything, req.Username).
		Return(models.User{}, nil)

	if err := usecase.CheckUsernameIsAvailable(ctx, req); !errors.Is(err, exceptions.ErrUsernameAlreadyExist) {
		t.Fatalf("should be exceptions.ErrUsernameAlreadyExist: %e", err)
	}
}
