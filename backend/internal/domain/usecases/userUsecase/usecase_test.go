package userUsecase

import (
	"backend/internal/domain/models"
	"backend/internal/exceptions"
	"backend/pkg/beda"
	"context"
	"errors"
	"github.com/google/uuid"
	"github.com/stretchr/testify/mock"
	"testing"
)

func TestUserUsecase_ReadById(t *testing.T) {
	ctx := context.Background()
	userService := NewMockUserService(t)
	userUsecase := NewUserUsecase(userService)

	t.Run("should success", func(t *testing.T) {
		genUUID, err := uuid.NewUUID()
		if err != nil {
			t.Fatal(err)
		}

		dto := ReadByIdRequest{
			IdUser: genUUID.String(),
		}

		userService.
			On("ReadById", mock.Anything, genUUID.String()).
			Return(models.User{}, nil)

		if _, err = userUsecase.ReadById(ctx, dto); err != nil {
			t.Fatal(err)
		}
	})

	t.Run("should not found", func(t *testing.T) {
		genUUID, err := uuid.NewUUID()
		if err != nil {
			t.Fatal(err)
		}

		dto := ReadByIdRequest{
			IdUser: genUUID.String(),
		}

		userService.
			On("ReadById", mock.Anything, genUUID.String()).
			Return(models.User{}, exceptions.ErrorNotFound)

		if _, err = userUsecase.ReadById(ctx, dto); !errors.Is(err, exceptions.ErrorNotFound) {
			t.Fatal(beda.Wrap("should be error not found, err:", err))
		}
	})

	// TODO test dto
}
