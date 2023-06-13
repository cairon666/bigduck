package authusecase

import (
	"context"
	"errors"
	"testing"

	"backend/internal/domain/exceptions"
	"backend/internal/domain/models"
	"github.com/stretchr/testify/mock"
)

func TestLoginRequest_IsValid(t *testing.T) {
	t.Parallel()

	tests := []struct {
		dto         LoginRequest
		description string
		shouldHas   exceptions.Error
	}{
		{
			dto: LoginRequest{
				Email:    "example@example.com",
				Password: "12345678",
			},
			description: "should success validate",
			shouldHas:   nil,
		},
		{
			dto: LoginRequest{
				Email:    "example@example.com",
				Password: "",
			},
			description: "should short password",
			shouldHas:   exceptions.ErrShortPassword,
		},
		{
			dto: LoginRequest{
				Email:    "",
				Password: "12345678",
			},
			description: "should bad email",
			shouldHas:   exceptions.ErrBadEmail,
		},
	}

HERE:
	for _, test := range tests {
		err := test.dto.IsValid()

		if test.shouldHas == nil && err == nil {
			continue
		}

		apiErr, _ := err.(exceptions.AppError)
		for _, err2 := range apiErr.Errors() {
			if errors.Is(err2, test.shouldHas) {
				continue HERE
			}
		}

		t.Fatalf("desc: %s, shouldHas %v, err: %v", test.description, test.shouldHas, err)
	}
}

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

	credential := models.Credential{
		Email:        dto.Email,
		PasswordHash: hash,
		Salt:         salt,
	}

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

	credential := models.Credential{
		Email:        dto.Email,
		PasswordHash: hash,
		Salt:         "1234567", // random salt
	}

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
