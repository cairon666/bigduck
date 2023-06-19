package authusecase

import (
	"context"
	"errors"
	"testing"

	"backend/internal/domain/exceptions"
	"backend/internal/domain/models"
	"github.com/stretchr/testify/mock"
)

func TestLogin_Success(t *testing.T) {
	t.Parallel()

	usecase, params := NewMockAuthUsecase(t)

	dto := LoginRequest{
		Email:    "example@example.com",
		Password: "12345678",
	}

	hash, salt, err := generateHashPassword(dto.Password)
	if err != nil {
		t.Fatal("should generate hash", err)
	}

	credential := models.NewCredential("", dto.Email, false, hash, salt)

	params.CredentialService.
		On("ReadByEmail", mock.Anything, dto.Email).
		Return(credential, nil)

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
		Email:    "example@example.com",
		Password: "12345678",
	}

	params.CredentialService.
		On("ReadByEmail", mock.Anything, dto.Email).
		Return(models.Credential{}, exceptions.ErrNotFound)

	_, err := usecase.Login(context.Background(), dto)
	if !errors.Is(err, exceptions.ErrNotFound) {
		t.Fatal("should not found err", err)
	}
}

func TestLogin_WrongPassword(t *testing.T) {
	t.Parallel()

	usecase, params := NewMockAuthUsecase(t)

	dto := LoginRequest{
		Email:    "example@example.com",
		Password: "12345678",
	}

	hash, _, err := generateHashPassword(dto.Password)
	if err != nil {
		t.Fatal("should generate hash", err)
	}

	credential := models.NewCredential("", dto.Email, false, hash, "1234567")

	params.CredentialService.
		On("ReadByEmail", mock.Anything, dto.Email).
		Return(credential, nil)

	params.MailService.
		On("SendSomebodyTryLogin", mock.Anything, dto.Email)

	_, err = usecase.Login(context.Background(), dto)
	if !errors.Is(err, exceptions.ErrBadPassword) {
		t.Fatal("should err bad password", err)
	}
}
