package register

import (
	"authService/internal/domain/models"
	"context"
)

type Repository interface {
	CreateSession(ctx context.Context, data models.Register) (IdSession string, error error)
	GetSession(ctx context.Context, IdSession string) (data models.Register, err error)
	SetSession(ctx context.Context, IdSession string, data models.Register) error
	DeleteSession(ctx context.Context, IdSession string) error
}

type service struct {
	repo Repository
}

func NewRegisterService(repo Repository) *service {
	return &service{
		repo: repo,
	}
}

func (s *service) CreateSession(ctx context.Context, data models.Register) (IdSession string, error error) {
	return s.repo.CreateSession(ctx, data)
}

func (s *service) GetSession(ctx context.Context, IdSession string) (data models.Register, err error) {
	return s.repo.GetSession(ctx, IdSession)
}

func (s *service) SetSession(ctx context.Context, IdSession string, data models.Register) error {
	return s.repo.SetSession(ctx, IdSession, data)
}

func (s *service) DeleteSession(ctx context.Context, IdSession string) error {
	return s.repo.DeleteSession(ctx, IdSession)
}
