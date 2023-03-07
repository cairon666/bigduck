package user

import (
	"authService/internal/domain/models"
	"context"
)

type Repository interface {
	GetById(ctx context.Context, id string) (models.User, error)
	GetByEmail(ctx context.Context, email string) (models.User, error)
	Create(ctx context.Context, user models.User) error
}

type userService struct {
	userRepo Repository
}

func NewUserService(userRepo Repository) *userService {
	return &userService{
		userRepo: userRepo,
	}
}

func (service *userService) GetById(ctx context.Context, id string) (models.User, error) {
	return service.userRepo.GetById(ctx, id)
}

func (service *userService) GetByEmail(ctx context.Context, email string) (models.User, error) {
	return service.userRepo.GetByEmail(ctx, email)
}

func (service *userService) Create(ctx context.Context, user models.User) error {
	return service.userRepo.Create(ctx, user)
}
