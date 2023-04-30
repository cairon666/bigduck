package authusecase

import (
	"context"
	"time"

	"backend/internal/domain/models"
)

//go:generate mockery --name UserService
type UserService interface {
	ReadByEmail(ctx context.Context, email string) (models.User, error)
	Create(ctx context.Context, user models.User) error
}
type Usecase struct {
	userService UserService
}

func NewAuthUsecase(userService UserService) *Usecase {
	return &Usecase{
		userService: userService,
	}
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

func (u *Usecase) Register(ctx context.Context, dto RegisterRequest) error {
	if err := dto.IsValid(); err != nil {
		return err
	}

	uuid, err := generateUUID()
	if err != nil {
		return err
	}

	salt, err := generateSalt()
	if err != nil {
		return err
	}

	hash, err := hashPassword(dto.Password, salt)
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
