package confirmemailcodeservice

import (
	"context"

	"backend/internal/domain/models"
)

type KVRepo interface {
	Get(ctx context.Context, key string) (map[string]string, error)
	Set(ctx context.Context, key string, data map[string]string) error
}

type service struct {
	repo KVRepo
}

func New(repo KVRepo) *service {
	return &service{
		repo: repo,
	}
}

func (s *service) Get(ctx context.Context, idUser string) (models.ConfirmEmail, error) {
	data, err := s.repo.Get(ctx, idUser)
	if err != nil {
		return models.ConfirmEmail{}, err
	}

	resp := models.ConfirmEmail{
		Code: data["code"],
	}

	return resp, nil
}

func (s *service) Set(ctx context.Context, idUser string, data models.ConfirmEmail) error {
	setData := map[string]string{
		"code": data.Code,
	}

	return s.repo.Set(ctx, idUser, setData)
}
