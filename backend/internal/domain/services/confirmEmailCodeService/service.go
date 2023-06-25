package confirmemailcodeservice

import (
	"context"
	"time"

	"backend/internal/domain/models"
)

type KVRepo interface {
	Get(ctx context.Context, key string) (*models.ConfirmEmailCode, error)
	Set(ctx context.Context, k *models.ConfirmEmailCode, expiration time.Duration) error
}

type service struct {
	repo KVRepo
}

func New(repo KVRepo) *service {
	return &service{repo: repo}
}

func (s *service) Get(ctx context.Context, key string) (*models.ConfirmEmailCode, error) {
	return s.repo.Get(ctx, key)
}

func (s *service) Set(ctx context.Context, k *models.ConfirmEmailCode, expiration time.Duration) error {
	return s.repo.Set(ctx, k, expiration)
}
