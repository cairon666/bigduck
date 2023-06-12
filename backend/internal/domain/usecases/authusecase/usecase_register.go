package authusecase

import (
	"context"
	"errors"
	"time"

	"backend/internal/domain/models"
	"backend/internal/exceptions"
	"backend/internal/validate"
)

type RegisterRequest struct {
	Email       string
	Password    string
	FirstName   string
	SecondName  string
	Gender      *string
	DateOfBirth *time.Time
	AvatarURL   *string
}

func (dto *RegisterRequest) IsValid() error {
	return validate.Test(
		validate.EmailSimple(dto.Email),
		validate.PasswordSimple(dto.Password),
		validate.FirstNameSimple(dto.FirstName),
		validate.SecondNameSimple(dto.SecondName),
		validate.TestPointer(dto.Gender, validate.Gender),
		validate.TestPointer(dto.DateOfBirth, validate.DayOfBirth),
		validate.TestPointer(dto.AvatarURL, validate.AvatarURL),
	)
}

func (u *Usecase) Register(ctx context.Context, dto RegisterRequest) error {
	if err := dto.IsValid(); err != nil {
		return err
	}

	_, err := u.userService.ReadByEmail(ctx, dto.Email)
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

	now := time.Now()

	user := models.User{
		ID:             uuid,
		Email:          dto.Email,
		EmailIsConfirm: false,
		PasswordHash:   hash,
		Salt:           salt,
		FirstName:      dto.FirstName,
		SecondName:     dto.SecondName,
		AvatarURL:      dto.AvatarURL,
		DateOfBirth:    dto.DateOfBirth,
		Gender:         nil,
		CreateAt:       now,
		ModifyAt:       now,
	}

	if dto.Gender != nil {
		tmp, err := models.ParseGender(*dto.Gender)
		if err != nil {
			return err
		}

		user.Gender = &tmp
	}

	return u.userService.Create(ctx, user)
}
