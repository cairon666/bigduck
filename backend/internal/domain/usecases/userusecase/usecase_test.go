package userusecase

import (
	"context"
	"errors"
	"testing"

	"backend/internal/domain/models"
	"backend/internal/exceptions"
	"backend/pkg/beda"
	"github.com/google/uuid"
	"github.com/stretchr/testify/mock"
)

func TestUserUsecase_ReadById(t *testing.T) {
	t.Parallel()

	ctx := context.Background()
	userService := NewMockUserService(t)
	userUsecase := NewUserUsecase(userService)

	t.Run("should success", func(t *testing.T) {
		t.Parallel()

		genUUID, err := uuid.NewUUID()
		if err != nil {
			t.Fatal(err)
		}

		dto := ReadByIDRequest{
			IDUser: genUUID.String(),
		}

		userService.
			On("ReadByID", mock.Anything, genUUID.String()).
			Return(models.User{}, nil)

		if _, err = userUsecase.ReadByID(ctx, dto); err != nil {
			t.Fatal(err)
		}
	})

	t.Run("should not found", func(t *testing.T) {
		t.Parallel()

		genUUID, err := uuid.NewUUID()
		if err != nil {
			t.Fatal(err)
		}

		dto := ReadByIDRequest{
			IDUser: genUUID.String(),
		}

		userService.
			On("ReadByID", mock.Anything, genUUID.String()).
			Return(models.User{}, exceptions.ErrNotFound)

		if _, err = userUsecase.ReadByID(ctx, dto); !errors.Is(err, exceptions.ErrNotFound) {
			t.Fatal(beda.Wrap("should be error not found, err:", err))
		}
	})
}
