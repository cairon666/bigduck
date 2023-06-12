package userservice

import (
	"context"
	"time"

	"backend/internal/domain/models"
)

type Repository interface {
	ReadOne(ctx context.Context, filter map[string]any) (models.User, error)
	Create(ctx context.Context, user models.User) error
	UpdateByID(ctx context.Context, id string, data map[string]any) error
	DeleteByID(ctx context.Context, id string) error
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
	return s.repo.ReadOne(ctx, map[string]any{"email": email})
}

func (s *UserService) ReadByID(ctx context.Context, id string) (models.User, error) {
	return s.repo.ReadOne(ctx, map[string]any{"id": id})
}

func (s *UserService) Create(ctx context.Context, user models.User) error {
	return s.repo.Create(ctx, user)
}

func (s *UserService) UpdateByID(ctx context.Context, id string, data map[string]any) error {
	return s.repo.UpdateByID(ctx, id, data)
}

func (s *UserService) UpdatePasswordByID(ctx context.Context, id, hash, salt string) error {
	return s.repo.UpdateByID(ctx, id, map[string]any{
		"password_hash": hash,
		"salt":          salt,
		"modify_at":     time.Now(),
	})
}

func (s *UserService) DeleteByID(ctx context.Context, id string) error {
	return s.repo.DeleteByID(ctx, id)
}
