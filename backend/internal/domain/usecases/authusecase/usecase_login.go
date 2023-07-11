package authusecase

import (
	"context"

	"backend/internal/domain/models"
	"backend/pkg/tracing"
	"github.com/google/uuid"
)

type LoginRequest struct {
	Email    string
	Password string
}

func NewLoginRequest(email, password string) LoginRequest {
	return LoginRequest{
		Email:    email,
		Password: password,
	}
}

type LoginResponse struct {
	IDUser uuid.UUID
	Roles  []models.RoleID
}

func (u *Usecase) Login(ctx context.Context, dto LoginRequest) (LoginResponse, error) {
	ctx, span := tracing.Start(ctx, "authusecase.Login")
	defer span.End()

	userFull, err := u.userService.ReadOneUserFullByEmail(ctx, dto.Email)
	if err != nil {
		return LoginResponse{}, err
	}

	err = checkPasswordHash(dto.Password, userFull.Credential.Salt, userFull.Credential.PasswordHash)
	if err != nil {
		// send email what somebody try log in account
		u.mailService.SendSomebodyTryLogin(ctx, dto.Email)

		return LoginResponse{}, err
	}

	// send email what somebody log in account
	u.mailService.SendSomebodyLogin(ctx, dto.Email)

	return LoginResponse{
		IDUser: userFull.User.ID,
		Roles:  userFull.Roles,
	}, nil
}
