package userservice

import (
	"context"

	"backend/internal/domain/models"
)

type Repository interface {
	ReadByEmail(ctx context.Context, email string) (models.User, error)
	ReadById(ctx context.Context, id string) (models.User, error)
	Create(ctx context.Context, user models.User) error
	UpdateById(ctx context.Context, id string, data map[string]any) error
	DeleteById(ctx context.Context, id string) error
}

type UserService struct {
	repo Repository
}

func NewUserService(repo Repository) *UserService {
	return &UserService{
		repo: repo,
	}
}

func (s *UserService) ReadByEmail(ctx context.Context, email string) (models.User, error) {
	return s.repo.ReadByEmail(ctx, email)
}

func (s *UserService) ReadByID(ctx context.Context, id string) (models.User, error) {
	return s.repo.ReadById(ctx, id)
}

func (s *UserService) Create(ctx context.Context, user models.User) error {
	return s.repo.Create(ctx, user)
}

func (s *UserService) UpdateByID(ctx context.Context, id string, data map[string]any) error {
	return s.repo.UpdateById(ctx, id, data)
}

func (s *UserService) DeleteByID(ctx context.Context, id string) error {
	return s.repo.DeleteById(ctx, id)
}
