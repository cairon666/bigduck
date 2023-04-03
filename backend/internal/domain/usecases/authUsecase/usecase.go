package authUsecase

import (
	"backend/internal/domain/models"
	"backend/pkg/beda"
	"context"
	"time"
)

//go:generate mockery --name UserService
type UserService interface {
	ReadByEmail(ctx context.Context, email string) (models.User, error)
	Create(ctx context.Context, user models.User) error
}
type usecase struct {
	userService UserService
}

func NewAuthUsecase(userService UserService) *usecase {
	return &usecase{
		userService: userService,
	}
}

func (u *usecase) Login(ctx context.Context, dto LoginRequest) (LoginResponse, error) {
	if err := dto.IsValid(); err != nil {
		return LoginResponse{}, beda.Wrap("IsValid", err)
	}

	user, err := u.userService.ReadByEmail(ctx, dto.Email)
	if err != nil {
		return LoginResponse{}, beda.Wrap("Read", err)
	}

	if err := checkPasswordHash(dto.Password, user.Salt, user.PasswordHash); err != nil {
		return LoginResponse{}, beda.Wrap("checkPasswordHash", err)
	}

	return LoginResponse{
		IdUser: user.Id,
	}, nil
}

func (u *usecase) Register(ctx context.Context, dto RegisterRequest) error {
	if err := dto.IsValid(); err != nil {
		return beda.Wrap("IsValid", err)
	}

	uuid, err := generateUUID()
	if err != nil {
		return beda.Wrap("generateUUID", err)
	}
	salt, err := generateSalt()
	if err != nil {
		return beda.Wrap("generateSalt", err)
	}
	hash, err := hashPassword(dto.Password, salt)
	if err != nil {
		return beda.Wrap("hashPassword", err)
	}
	now := time.Now()

	user := models.User{
		Id:             uuid,
		Email:          dto.Email,
		EmailIsConfirm: false,
		PasswordHash:   hash,
		Salt:           salt,
		FirstName:      dto.FirstName,
		SecondName:     dto.SecondName,
		AvatarURL:      dto.AvatarURL,
		DateOfBirth:    dto.DateOfBirth,
		Gender:         models.ParseGender(dto.Gender),
		CreateAt:       now,
		ModifyAt:       now,
	}

	if err := u.userService.Create(ctx, user); err != nil {
		return beda.Wrap("Create", err)
	}

	return nil
}
