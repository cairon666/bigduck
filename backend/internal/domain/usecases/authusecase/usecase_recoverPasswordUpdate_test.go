package authusecase

import (
	"context"
	"errors"
	"testing"

	"backend/internal/domain/models"
	"backend/internal/domain/validate"
	"backend/internal/exceptions"
	"github.com/google/uuid"
	"github.com/stretchr/testify/mock"
)

func TestRecoverPasswordUpdate_Success(t *testing.T) {
	t.Parallel()

	usecase, props := NewMockAuthUsecase(t)

	dto := RecoverPasswordUpdateRequest{
		Email:    validate.MockEmail,
		Password: validate.MockPassword,
	}

	hash, salt, err := generateHashPassword(validate.MockPassword2)
	if err != nil {
		t.Fatal(err)
	}

	recoverData := models.NewRecoverPassword(dto.Email, uuid.New().String(), true, "")

	user := models.User{
		PasswordHash: hash,
		Salt:         salt,
	}

	key := models.RecoverPasswordKey(dto.Email)

	props.RecoverPasswordCodeService.
		On("Get", mock.Anything, key).
		Return(recoverData, nil)

	props.UserService.
		On("ReadByID", mock.Anything, recoverData.ID).
		Return(user, nil)

	props.UserService.
		On(
			"UpdatePasswordByID",
			mock.Anything,
			recoverData.ID,
			mock.AnythingOfType("string"),
			mock.AnythingOfType("string"),
		).
		Return(nil)

	err = usecase.RecoverPasswordUpdate(context.Background(), dto)
	if err != nil {
		t.Fatalf("should success, err: %s", err)
	}
}

func TestRecoverPasswordUpdate_EmailNotConfirm(t *testing.T) {
	t.Parallel()

	usecase, props := NewMockAuthUsecase(t)

	dto := RecoverPasswordUpdateRequest{
		Email:    validate.MockEmail,
		Password: validate.MockPassword,
	}

	key := models.RecoverPasswordKey(dto.Email)

	recoverData := models.NewRecoverPassword(dto.Email, uuid.New().String(), false, "")

	props.RecoverPasswordCodeService.
		On("Get", mock.Anything, key).
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
		Email:    validate.MockEmail,
		Password: validate.MockPassword,
	}

	hash, salt, err := generateHashPassword(dto.Password)
	if err != nil {
		t.Fatal(err)
	}

	recoverData := models.NewRecoverPassword(dto.Email, uuid.New().String(), true, "")

	user := models.User{
		PasswordHash: hash,
		Salt:         salt,
	}

	key := models.RecoverPasswordKey(dto.Email)

	props.RecoverPasswordCodeService.
		On("Get", mock.Anything, key).
		Return(recoverData, nil)

	props.UserService.
		On("ReadByID", mock.Anything, recoverData.ID).
		Return(user, nil)

	err = usecase.RecoverPasswordUpdate(context.Background(), dto)
	if !errors.Is(err, exceptions.ErrNewPasswordEqualOldPassword) {
		t.Fatalf("should new password equal old password err, err: %s", err)
	}
}
