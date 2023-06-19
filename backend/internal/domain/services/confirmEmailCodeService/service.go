package confirmemailcodeservice

import (
	"context"
)

type KVRepo interface {
	Get(ctx context.Context, key string) (string, error)
	Set(ctx context.Context, key string, data string) error
}

type service struct {
	repo KVRepo
}

func New(repo KVRepo) *service {
	return &service{
		repo: repo,
	}
}

func (s *service) Get(ctx context.Context, idUser string) (string, error) {
	return s.repo.Get(ctx, idUser)
}

func (s *service) Set(ctx context.Context, idUser, code string) error {
	return s.repo.Set(ctx, idUser, code)
}
