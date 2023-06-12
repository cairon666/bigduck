package authusecase

import (
	"context"

	"backend/internal/validate"
)

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

func (u *Usecase) Login(ctx context.Context, dto LoginRequest) (LoginResponse, error) {
	if err := dto.IsValid(); err != nil {
		return LoginResponse{}, err
	}

	user, err := u.userService.ReadByEmail(ctx, dto.Email)
	if err != nil {
		return LoginResponse{}, err
	}

	if err := checkPasswordHash(dto.Password, user.Salt, user.PasswordHash); err != nil {
		return LoginResponse{}, err
	}

	return LoginResponse{
		IDUser: user.ID,
	}, nil
}
