package recoverpasswordcodeservice

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

func (s *service) Get(ctx context.Context, email string) (models.RecoverPassword, error) {
	data, err := s.repo.Get(ctx, email)
	if err != nil {
		return models.RecoverPassword{}, err
	}

	resp := models.RecoverPassword{
		Email:        data["email"],
		ID:           data["id"],
		IsConfirm:    false,
		Code:         data["code"],
		PasswordHash: data["password_hash"],
		Salt:         data["salt"],
	}

	if isConfirm := data["is_confirm"]; isConfirm == "true" {
		resp.IsConfirm = true
	}

	return resp, nil
}

func (s *service) Set(ctx context.Context, email string, data models.RecoverPassword) error {
	setData := map[string]string{
		"email":         data.Email,
		"id":            data.ID,
		"code":          data.Code,
		"password_hash": data.PasswordHash,
		"salt":          data.Salt,
	}

	if data.IsConfirm {
		setData["is_confirm"] = "true"
	} else {
		setData["is_confirm"] = "false"
	}

	return s.repo.Set(ctx, email, setData)
}
