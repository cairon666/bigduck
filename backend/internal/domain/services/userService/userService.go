package userService

import (
	"backend/internal/domain/models"
	"context"
)

type Repository interface {
	ReadByEmail(ctx context.Context, email string) (models.User, error)
	ReadById(ctx context.Context, id string) (models.User, error)
	Create(ctx context.Context, user models.User) error
	UpdateById(ctx context.Context, id string, data map[string]any) error
	DeleteById(ctx context.Context, id string) error
}

type userService struct {
	repo Repository
}

func NewUserService(repo Repository) *userService {
	return &userService{
		repo: repo,
	}
}

func (s *userService) ReadByEmail(ctx context.Context, email string) (models.User, error) {
	return s.repo.ReadByEmail(ctx, email)
}

func (s *userService) ReadById(ctx context.Context, id string) (models.User, error) {
	return s.repo.ReadById(ctx, id)
}

func (s *userService) Create(ctx context.Context, user models.User) error {
	return s.repo.Create(ctx, user)
}

func (s *userService) UpdateById(ctx context.Context, id string, data map[string]any) error {
	return s.repo.UpdateById(ctx, id, data)
}

func (s *userService) DeleteById(ctx context.Context, id string) error {
	return s.repo.DeleteById(ctx, id)
}
