package userservice

import (
	"context"

	"backend/internal/domain/models"
)

type Repository interface {
	ReadOne(ctx context.Context, filter map[string]any) (models.User, error)
	Create(ctx context.Context, user models.User) error
	UpdateByID(ctx context.Context, id string, data map[string]any) error
	DeleteByID(ctx context.Context, id string) error
}

type service struct {
	repo Repository
}

func NewUserService(repo Repository) *service {
	return &service{
		repo: repo,
	}
}

func (s *service) ReadByEmail(ctx context.Context, email string) (models.User, error) {
	return s.repo.ReadOne(ctx, map[string]any{"email": email})
}

func (s *service) ReadByUsername(ctx context.Context, username string) (models.User, error) {
	return s.repo.ReadOne(ctx, map[string]any{"user_name": username})
}

func (s *service) ReadByID(ctx context.Context, id string) (models.User, error) {
	return s.repo.ReadOne(ctx, map[string]any{"id": id})
}

func (s *service) Create(ctx context.Context, user models.User) error {
	return s.repo.Create(ctx, user)
}

func (s *service) UpdateEmailByID(ctx context.Context, id string, email string) error {
	return s.repo.UpdateByID(ctx, id, map[string]any{
		"email":            email,
		"email_is_confirm": false,
	})
}

func (s *service) UpdatePasswordByID(ctx context.Context, id, hash, salt string) error {
	return s.repo.UpdateByID(ctx, id, map[string]any{
		"password_hash": hash,
		"salt":          salt,
	})
}

func (s *service) ConfirmEmailByID(ctx context.Context, id string) error {
	return s.repo.UpdateByID(ctx, id, map[string]any{
		"email_is_confirm": true,
	})
}

func (s *service) DeleteByID(ctx context.Context, id string) error {
	return s.repo.DeleteByID(ctx, id)
}
