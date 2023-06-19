package authusecase

import (
	"context"
	"errors"
	"testing"

	"backend/internal/domain/exceptions"
	"backend/internal/domain/models"
	"github.com/google/uuid"
	"github.com/stretchr/testify/mock"
)

func TestRecoverPasswordUpdate_Success(t *testing.T) {
	t.Parallel()

	usecase, props := NewMockAuthUsecase(t)

	dto := RecoverPasswordUpdateRequest{
		Email:    "example@example.com",
		Password: "12345678",
	}

	hash, salt, err := generateHashPassword("87654321")
	if err != nil {
		t.Fatal(err)
	}

	recoverData := models.NewRecoverPassword(dto.Email, uuid.New().String(), true, "")

	credential := models.NewCredential("", "", false, hash, salt)

	props.RecoverPasswordCodeService.
		On("Get", mock.Anything, dto.Email).
		Return(recoverData, nil)

	props.CredentialService.
		On(
			"UpdatePasswordByID",
			mock.Anything,
			recoverData.ID,
			mock.AnythingOfType("string"),
			mock.AnythingOfType("string"),
		).
		Return(nil)

	props.CredentialService.
		On("ReadByID", mock.Anything, recoverData.ID).
		Return(credential, nil)

	err = usecase.RecoverPasswordUpdate(context.Background(), dto)
	if err != nil {
		t.Fatalf("should success, err: %s", err)
	}
}

func TestRecoverPasswordUpdate_EmailNotConfirm(t *testing.T) {
	t.Parallel()

	usecase, props := NewMockAuthUsecase(t)

	dto := RecoverPasswordUpdateRequest{
		Email:    "example@example.com",
		Password: "12345678",
	}

	recoverData := models.NewRecoverPassword(dto.Email, uuid.New().String(), false, "")

	props.RecoverPasswordCodeService.
		On("Get", mock.Anything, dto.Email).
		Return(recoverData, nil)

	err := usecase.RecoverPasswordUpdate(context.Background(), dto)
	if !errors.Is(err, exceptions.ErrRecoverEmailNotConfirm) {
		t.Fatalf("should evail not confirm err, err: %s", err)
	}
}

func TestRecoverPasswordUpdate_NewPasswordEqualOldPassword(t *testing.T) {
	t.Parallel()

	usecase, props := NewMockAuthUsecase(t)

	dto := RecoverPasswordUpdateRequest{
		Email:    "example@example.com",
		Password: "12345678",
	}

	hash, salt, err := generateHashPassword(dto.Password)
	if err != nil {
		t.Fatal(err)
	}

	recoverData := models.NewRecoverPassword(dto.Email, uuid.New().String(), true, "")

	credential := models.NewCredential("", "", false, hash, salt)

	props.RecoverPasswordCodeService.
		On("Get", mock.Anything, dto.Email).
		Return(recoverData, nil)

	props.CredentialService.
		On("ReadByID", mock.Anything, recoverData.ID).
		Return(credential, nil)

	err = usecase.RecoverPasswordUpdate(context.Background(), dto)
	if !errors.Is(err, exceptions.ErrNewPasswordEqualOldPassword) {
		t.Fatalf("should new password equal old password err, err: %s", err)
	}
}
