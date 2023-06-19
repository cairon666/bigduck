package authusecase

import (
	"context"
	"errors"
	"time"

	"backend/internal/domain/exceptions"
	"backend/internal/domain/models"
	"backend/internal/domain/validate"
	"backend/pkg/tracing"
)

type RegisterRequest struct {
	Email       string
	Password    string
	FirstName   string
	SecondName  string
	UserName    string
	Gender      *models.Gender
	DateOfBirth *time.Time
	AvatarURL   *string
}

func NewRegisterRequest(
	email, password, firstName, secondName, userName string,
	gender *string,
	dateOfBirth *time.Time,
	avatarURL *string,
) (RegisterRequest, error) {
	if err := validate.Test(
		validate.EmailSimple(email),
		validate.PasswordSimple(password),
		validate.FirstNameSimple(firstName),
		validate.SecondNameSimple(secondName),
		validate.UserNameSimple(userName),
		validate.TestPointer(gender, validate.Gender),
		validate.TestPointer(dateOfBirth, validate.DayOfBirth),
		validate.TestPointer(avatarURL, validate.AvatarURL),
	); err != nil {
		return RegisterRequest{}, err
	}

	return RegisterRequest{
		Email:       email,
		Password:    password,
		FirstName:   firstName,
		SecondName:  secondName,
		UserName:    userName,
		Gender:      models.MustParseGenderPoint(gender),
		DateOfBirth: dateOfBirth,
		AvatarURL:   avatarURL,
	}, nil
}

func (u *Usecase) Register(ctx context.Context, dto RegisterRequest) error {
	ctx, span := tracing.Start(ctx, "authusecase.Register")
	defer span.End()

	_, err := u.credentialService.ReadByEmail(ctx, dto.Email)
	if err == nil {
		return exceptions.ErrEmailAlreadyExist
	}

	if !errors.Is(err, exceptions.ErrNotFound) {
		return err
	}

	uuid, err := generateUUID()
	if err != nil {
		return err
	}

	hash, salt, err := generateHashPassword(dto.Password)
	if err != nil {
		return err
	}

	credential := models.NewCredential(uuid, dto.Email, false, hash, salt)

	user := models.NewUser(
		uuid,
		dto.Email,
		dto.FirstName,
		dto.SecondName,
		dto.UserName,
		dto.DateOfBirth,
		dto.AvatarURL,
		dto.Gender,
		time.Now(),
	)

	if err := u.credentialService.Create(ctx, credential); err != nil {
		return err
	}

	if err := u.userService.Create(ctx, user); err != nil {
		return err
	}

	return nil
}
