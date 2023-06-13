package credentialservice

import (
	"context"

	"backend/internal/domain/models"
)

type CredentialRepository interface {
	ReadOne(ctx context.Context, filter map[string]any) (models.Credential, error)
	Create(ctx context.Context, credential models.Credential) error
	DeleteByID(ctx context.Context, id string) error
	UpdateByID(ctx context.Context, id string, data map[string]any) error
}

type service struct {
	repo CredentialRepository
}

func NewCredentialService(repo CredentialRepository) *service {
	return &service{
		repo: repo,
	}
}

func (s *service) ReadByEmail(ctx context.Context, email string) (models.Credential, error) {
	return s.repo.ReadOne(ctx, map[string]any{"email": email})
}

func (s *service) ReadByID(ctx context.Context, id string) (models.Credential, error) {
	return s.repo.ReadOne(ctx, map[string]any{"id": id})
}

func (s *service) Create(ctx context.Context, credential models.Credential) error {
	return s.repo.Create(ctx, credential)
}

func (s *service) DeleteByID(ctx context.Context, id string) error {
	return s.repo.DeleteByID(ctx, id)
}

func (s *service) UpdateByID(ctx context.Context, id string, data map[string]any) error {
	return s.repo.UpdateByID(ctx, id, data)
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
