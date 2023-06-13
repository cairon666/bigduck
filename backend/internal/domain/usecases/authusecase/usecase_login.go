package authusecase

import (
	"context"

	validate2 "backend/internal/domain/validate"
)

type LoginRequest struct {
	Email    string
	Password string
}

func (dto *LoginRequest) IsValid() error {
	return validate2.Test(
		validate2.EmailSimple(dto.Email),
		validate2.PasswordSimple(dto.Password),
	)
}

type LoginResponse struct {
	IDUser string
}

func (u *Usecase) Login(ctx context.Context, dto LoginRequest) (LoginResponse, error) {
	if err := dto.IsValid(); err != nil {
		return LoginResponse{}, err
	}

	user, err := u.credentialService.ReadByEmail(ctx, dto.Email)
	if err != nil {
		return LoginResponse{}, err
	}

	if err := checkPasswordHash(dto.Password, user.Salt, user.PasswordHash); err != nil {
		// send email what somebody try log in account
		u.mailService.SendSomebodyTryLogin(ctx, dto.Email)

		return LoginResponse{}, err
	}

	// send email what somebody log in account
	u.mailService.SendSomebodyLogin(ctx, dto.Email)

	return LoginResponse{
		IDUser: user.ID,
	}, nil
}
