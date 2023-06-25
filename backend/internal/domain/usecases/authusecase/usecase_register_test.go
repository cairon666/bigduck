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

// errInternal - fon imitation internal error
var errInternal = errors.New("some internal error")

func TestRegister_Success(t *testing.T) {
	t.Parallel()

	usecase, props := NewMockAuthUsecase(t)

	dto := RegisterRequest{
		Email:       validate.MockEmail,
		Password:    validate.MockPassword,
		FirstName:   validate.MockFirstName,
		SecondName:  validate.MockSecondName,
		UserName:    validate.MockUserName,
		Gender:      nil,
		DateOfBirth: nil,
		AvatarURL:   nil,
	}

	props.UserService.
		On("ReadByEmail", mock.Anything, dto.Email).
		Return(models.User{}, exceptions.ErrNotFound)

	props.UserService.
		On("Create", mock.Anything, mock.IsType(models.User{})).
		Return(nil)

	props.UserService.
		On("Create", mock.Anything, mock.IsType(models.User{})).
		Return(nil)

	if err := usecase.Register(context.Background(), dto); err != nil {
		t.Fatalf("should be success, err: %v", err)
	}
}

func TestRegister_AlreadyExist(t *testing.T) {
	t.Parallel()

	usecase, props := NewMockAuthUsecase(t)

	dto := RegisterRequest{
		Email:       validate.MockEmail,
		Password:    validate.MockPassword,
		FirstName:   validate.MockFirstName,
		SecondName:  validate.MockSecondName,
		UserName:    validate.MockUserName,
		Gender:      nil,
		DateOfBirth: nil,
		AvatarURL:   nil,
	}

	props.UserService.
		On("ReadByEmail", mock.Anything, dto.Email).
		Return(models.User{}, nil)

	err := usecase.Register(context.Background(), dto)
	if !errors.Is(err, exceptions.ErrEmailAlreadyExist) {
		t.Fatalf("should be alredy exsist, err: %v", err)
	}
}

func TestRegister_InternalError(t *testing.T) {
	t.Parallel()

	usecase, props := NewMockAuthUsecase(t)

	dto := RegisterRequest{
		Email:       validate.MockEmail,
		Password:    validate.MockPassword,
		FirstName:   validate.MockFirstName,
		SecondName:  validate.MockSecondName,
		UserName:    validate.MockUserName,
		Gender:      nil,
		DateOfBirth: nil,
		AvatarURL:   nil,
	}

	props.UserService.
		On("ReadByEmail", mock.Anything, dto.Email).
		Return(models.User{}, errInternal)

	err := usecase.Register(context.Background(), dto)
	if !errors.Is(err, errInternal) {
		t.Fatalf("should be intenale err, err: %v", err)
	}
}