package recoverpasswordcodeservice

import (
	"context"
	"encoding/json"

	"backend/internal/domain/models"
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

func (s *service) Get(ctx context.Context, email string) (models.RecoverPassword, error) {
	data, err := s.repo.Get(ctx, email)
	if err != nil {
		return models.RecoverPassword{}, err
	}

	var resp models.RecoverPassword
	if err := json.Unmarshal([]byte(data), &resp); err != nil {
		return models.RecoverPassword{}, err
	}

	return resp, nil
}

func (s *service) Set(ctx context.Context, email string, data models.RecoverPassword) error {
	jsonData, err := json.Marshal(data)
	if err != nil {
		return err
	}

	return s.repo.Set(ctx, email, string(jsonData))
}
