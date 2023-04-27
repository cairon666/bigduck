package authusecase

import (
	"context"
	"errors"
	"testing"
	"time"

	"backend/internal/domain/models"
	"backend/internal/exceptions"
	"github.com/stretchr/testify/mock"
)

func bootstrap(t *testing.T) (context.Context, *MockUserService, *Usecase) {
	t.Helper()

	ctx := context.Background()
	userService := NewMockUserService(t)
	usecase := NewAuthUsecase(userService)

	return ctx, userService, usecase
}

func Test_LoginNotFound(t *testing.T) {
	t.Parallel()

	ctx, userService, usecase := bootstrap(t)

	dto := LoginRequest{Email: "badd@example.example", Password: "someP@s3.ford"}

	userService.
		On("ReadByEmail", mock.Anything, dto.Email).
		Return(models.User{}, exceptions.ErrNotFound)

	_, err := usecase.Login(ctx, dto)
	if err == nil {
		t.Fatal("should be error not found")
	}
}

func Test_LoginSuccess(t *testing.T) {
	t.Parallel()

	ctx, userService, usecase := bootstrap(t)

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
		ID:             uuid,
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
}

func Test_Register(t *testing.T) {
	t.Parallel()

	ctx, userService, usecase := bootstrap(t)

	t.Run("should success", func(t *testing.T) {
		t.Parallel()

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
		t.Parallel()

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
			Return(exceptions.ErrEmailAlreadyExist)

		if err := usecase.Register(ctx, dto); !errors.Is(err, exceptions.ErrEmailAlreadyExist) {
			t.Fatal("should be already exist, err: ", err)
		}
	})
}
