package mailservice

import (
	"context"

	"backend/internal/domain/models"
)

type MailProvider interface {
	SendRecoverPasswordCode(ctx context.Context, data models.RecoverPassword) error
}

type service struct {
	provider MailProvider
}

func NewMailService(provider MailProvider) *service {
	return &service{
		provider: provider,
	}
}

func (s *service) SendRecoverPasswordCode(ctx context.Context, data models.RecoverPassword) error {
	return s.provider.SendRecoverPasswordCode(ctx, data)
}
