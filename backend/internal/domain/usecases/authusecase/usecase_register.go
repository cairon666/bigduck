package authusecase

import (
	"context"
	"errors"
	"time"

	"backend/internal/domain/exceptions"
	"backend/internal/domain/models"
	validate2 "backend/internal/domain/validate"
)

type RegisterRequest struct {
	Email       string
	Password    string
	FirstName   string
	SecondName  string
	UserName    string
	Gender      *string
	DateOfBirth *time.Time
	AvatarURL   *string
}

func (dto *RegisterRequest) IsValid() error {
	return validate2.Test(
		validate2.EmailSimple(dto.Email),
		validate2.PasswordSimple(dto.Password),
		validate2.FirstNameSimple(dto.FirstName),
		validate2.SecondNameSimple(dto.SecondName),
		validate2.UserNameSimple(dto.UserName),
		validate2.TestPointer(dto.Gender, validate2.Gender),
		validate2.TestPointer(dto.DateOfBirth, validate2.DayOfBirth),
		validate2.TestPointer(dto.AvatarURL, validate2.AvatarURL),
	)
}

func (u *Usecase) Register(ctx context.Context, dto RegisterRequest) error {
	if err := dto.IsValid(); err != nil {
		return err
	}

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

	credential := models.Credential{
		ID:             uuid,
		Email:          dto.Email,
		EmailIsConfirm: false,
		PasswordHash:   hash,
		Salt:           salt,
	}

	user := models.User{
		ID:          uuid,
		Email:       dto.Email,
		FirstName:   dto.FirstName,
		SecondName:  dto.SecondName,
		UserName:    dto.UserName,
		AvatarURL:   dto.AvatarURL,
		DateOfBirth: dto.DateOfBirth,
		Gender:      models.MustParseGenderPoint(dto.Gender),
		CreateAt:    time.Now(),
	}

	if err := u.credentialService.Create(ctx, credential); err != nil {
		return err
	}

	if err := u.userService.Create(ctx, user); err != nil {
		return err
	}

	return nil
}
