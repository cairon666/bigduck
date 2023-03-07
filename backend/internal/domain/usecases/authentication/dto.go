package authentication

import (
	"authService/internal/domain/validate"
	"time"
)

type LoginRequestDTO struct {
	Email    string
	Password string
}

func (dto *LoginRequestDTO) IsValid() error {
	var err error

	if err = validate.EmailStrict(dto.Email); err != nil {
		return err
	}

	if err = validate.PasswordEasy(dto.Password); err != nil {
		return err
	}

	return nil
}

type LoginResponseDTO struct {
	IdUser string
}

type RegisterFirstRequestDTO struct {
	Email string
}

func (dto *RegisterFirstRequestDTO) IsValid() error {
	var err error

	if err = validate.EmailStrict(dto.Email); err != nil {
		return err
	}

	return nil
}

type RegisterFirstResponseDTO struct {
	IdAuth string
}

type RegisterSecondRequestDTO struct {
	EmailCode string
	IdAuth    string
}

func (dto *RegisterSecondRequestDTO) IsValid() error {
	var err error

	if err = validate.EmailCode(dto.EmailCode); err != nil {
		return err
	}

	if err = validate.Uuid(dto.IdAuth); err != nil {
		return err
	}

	return nil
}

type RegisterThirdRequestDTO struct {
	IdAuth      string
	Password    string
	FirstName   string
	SecondName  string
	Gender      *string
	DateOfBirth *time.Time
}

func (dto *RegisterThirdRequestDTO) IsValid() (err error) {
	if err = validate.Uuid(dto.IdAuth); err != nil {
		return err
	}

	if err = validate.PasswordEasy(dto.Password); err != nil {
		return err
	}

	if err = validate.FirstName(dto.FirstName); err != nil {
		return err
	}

	if err = validate.SecondName(dto.SecondName); err != nil {
		return err
	}

	return nil
}

type RegisterThirdResponseDTO struct {
}

type RefreshRequestDTO struct {
	RefreshToken string
}

func (dto *RefreshRequestDTO) IsValid() error {
	return nil
}

type RefreshResponseDTO struct {
	AccessToken  string
	RefreshToken string
}

type EmailIsUniqueRequestDTO struct {
	Email string
}

func (dto *EmailIsUniqueRequestDTO) IsValid() error {
	var err error

	if err = validate.EmailStrict(dto.Email); err != nil {
		return err
	}

	return nil
}
