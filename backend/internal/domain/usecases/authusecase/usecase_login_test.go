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

func TestLogin_Success(t *testing.T) {
	t.Parallel()

	usecase, params := NewMockAuthUsecase(t)

	dto := LoginRequest{
		Email:    validate.MockEmail,
		Password: validate.MockPassword,
	}

	hash, salt, err := generateHashPassword(dto.Password)
	if err != nil {
		t.Fatal("should generate hash", err)
	}

	user := models.User{
		Email:        dto.Email,
		PasswordHash: hash,
		Salt:         salt,
	}

	params.UserService.
		On("ReadByEmail", mock.Anything, dto.Email).
		Return(user, nil)

	params.MailService.
		On("SendSomebodyLogin", mock.Anything, dto.Email)

	_, err = usecase.Login(context.Background(), dto)
	if err != nil {
		t.Fatal("should success login", err)
	}
}

func TestLogin_EmailNotFound(t *testing.T) {
	t.Parallel()
	usecase, params := NewMockAuthUsecase(t)

	dto := LoginRequest{
		Email:    validate.MockEmail,
		Password: validate.MockPassword,
	}

	params.UserService.
		On("ReadByEmail", mock.Anything, dto.Email).
		Return(models.User{}, exceptions.ErrNotFound)

	_, err := usecase.Login(context.Background(), dto)
	if !errors.Is(err, exceptions.ErrNotFound) {
		t.Fatal("should not found err", err)
	}
}

func TestLogin_WrongPassword(t *testing.T) {
	t.Parallel()

	usecase, params := NewMockAuthUsecase(t)

	dto := LoginRequest{
		Email:    validate.MockEmail,
		Password: validate.MockPassword,
	}

	hash, _, err := generateHashPassword(dto.Password)
	if err != nil {
		t.Fatal("should generate hash", err)
	}

	user := models.User{
		Email:        dto.Email,
		PasswordHash: hash,
		Salt:         "1234567",
	}

	params.UserService.
		On("ReadByEmail", mock.Anything, dto.Email).
		Return(user, nil)

	params.MailService.
		On("SendSomebodyTryLogin", mock.Anything, dto.Email)

	_, err = usecase.Login(context.Background(), dto)
	if !errors.Is(err, exceptions.ErrBadPassword) {
		t.Fatal("should err bad password", err)
	}
}
