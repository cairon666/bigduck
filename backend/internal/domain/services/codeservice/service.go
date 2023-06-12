package codeservice

import (
	"context"

	"backend/internal/domain/models"
)

type CodeRepo interface {
	GetCodeByEmail(ctx context.Context, email string) (models.RecoverPassword, error)
	SetCode(ctx context.Context, data models.RecoverPassword) error
}

type service struct {
	repo CodeRepo
}

func NewCodeService(repo CodeRepo) *service {
	return &service{
		repo: repo,
	}
}

func (s *service) GetCodeByEmail(ctx context.Context, email string) (models.RecoverPassword, error) {
	return s.repo.GetCodeByEmail(ctx, email)
}

func (s *service) SetCode(ctx context.Context, data models.RecoverPassword) error {
	return s.repo.SetCode(ctx, data)
}
