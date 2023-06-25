package authusecase

import (
	"context"

	"backend/internal/domain/validate"
	"backend/pkg/tracing"
)

type LoginRequest struct {
	Email    string
	Password string
}

func NewLoginRequest(email, password string) (LoginRequest, error) {
	if err := validate.Test(
		validate.EmailSimple(email),
		validate.PasswordSimple(password),
	); err != nil {
		return LoginRequest{}, err
	}

	return LoginRequest{
		Email:    email,
		Password: password,
	}, nil
}

type LoginResponse struct {
	IDUser string
}

func (u *Usecase) Login(ctx context.Context, dto LoginRequest) (LoginResponse, error) {
	ctx, span := tracing.Start(ctx, "authusecase.Login")
	defer span.End()

	user, err := u.userService.ReadByEmail(ctx, dto.Email)
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
