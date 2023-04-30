package authusecase

import (
	"time"

	"backend/internal/validate"
)

// --------------------- Register -----------------

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

// ----------------- LOGIN ----------------

type LoginRequest struct {
	Email    string
	Password string
}

func (dto *LoginRequest) IsValid() error {
	return validate.Test(
		validate.EmailSimple(dto.Email),
		validate.PasswordSimple(dto.Password),
	)
}

type LoginResponse struct {
	IDUser string
}
