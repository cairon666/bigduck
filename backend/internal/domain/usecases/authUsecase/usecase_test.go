package authUsecase

import (
	"backend/internal/domain/models"
	"backend/internal/exceptions"
	"context"
	"errors"
	"github.com/stretchr/testify/mock"
	"testing"
	"time"
)

func TestUserUsecase_Login(t *testing.T) {
	ctx := context.Background()
	userService := NewMockUserService(t)
	usecase := NewAuthUsecase(userService)

	t.Run("should not found err", func(t *testing.T) {
		dto := LoginRequest{Email: "badd@example.example", Password: "someP@s3.ford"}

		userService.
			On("ReadByEmail", mock.Anything, dto.Email).
			Return(models.User{}, exceptions.ErrorNotFound)

		_, err := usecase.Login(ctx, dto)
		if err == nil {
			t.Fatal("should be error not found")
		}
	})

	t.Run("should success", func(t *testing.T) {
		dto := LoginRequest{Email: "success@example.example", Password: "someP@s3.ford"}

		uuid, err := generateUUID()
		if err != nil {
			t.Fatal(err)
		}
		salt, err := generateSalt()
		if err != nil {
			t.Fatal(err)
		}
		hash, err := hashPassword(dto.Password, salt)
		if err != nil {
			t.Fatal(err)
		}
		now := time.Now()

		user := models.User{
			Id:             uuid,
			Email:          dto.Email,
			EmailIsConfirm: false,
			PasswordHash:   hash,
			Salt:           salt,
			FirstName:      "First",
			SecondName:     "Second",
			AvatarURL:      nil,
			DateOfBirth:    nil,
			Gender:         nil,
			CreateAt:       now,
			ModifyAt:       now,
		}

		userService.
			On("ReadByEmail", mock.Anything, dto.Email).
			Return(user, nil)

		_, err = usecase.Login(ctx, dto)
		if err != nil {
			t.Fatal("should be success, err: ", err)
		}
	})

	// TODO test for dto
}

func TestUsecase_Register(t *testing.T) {
	ctx := context.Background()
	userService := NewMockUserService(t)
	usecase := NewAuthUsecase(userService)

	t.Run("should success", func(t *testing.T) {
		dto := RegisterRequest{
			Email:       "success@example.example",
			Password:    "someP@s3.ford",
			FirstName:   "First",
			SecondName:  "Second",
			Gender:      nil,
			DateOfBirth: nil,
			AvatarURL:   nil,
		}

		userService.
			On("Create", mock.Anything, mock.MatchedBy(func(u models.User) bool { return u.Email == dto.Email })).
			Return(nil)

		if err := usecase.Register(ctx, dto); err != nil {
			t.Fatal(err)
		}
	})

	t.Run("should email already exist", func(t *testing.T) {
		dto := RegisterRequest{
			Email:       "error@example.example",
			Password:    "someP@s3.ford",
			FirstName:   "First",
			SecondName:  "Second",
			Gender:      nil,
			DateOfBirth: nil,
			AvatarURL:   nil,
		}

		userService.
			On("Create", mock.Anything, mock.MatchedBy(func(u models.User) bool { return u.Email == dto.Email })).
			Return(exceptions.ErrorEmailAlreadyExist)

		if err := usecase.Register(ctx, dto); !errors.Is(err, exceptions.ErrorEmailAlreadyExist) {
			t.Fatal("should be already exist, err: ", err)
		}
	})

	// TODO test for dto
}
