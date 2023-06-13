package mailservice

import (
	"context"
)

type MailProvider interface {
	SendRecoverPasswordCode(ctx context.Context, email, code string)
	SendSomebodyLogin(ctx context.Context, email string)
	SendSomebodyTryLogin(ctx context.Context, email string)
	SendPasswordWasUpdate(ctx context.Context, email string)
	SendEmailWasUpdate(ctx context.Context, email string)
	SendEmailConfirmCode(ctx context.Context, email, code string)
}

type service struct {
	provider MailProvider
}

func NewMailService(provider MailProvider) *service {
	return &service{
		provider: provider,
	}
}

func (s *service) SendRecoverPasswordCode(ctx context.Context, email, code string) {
	s.provider.SendRecoverPasswordCode(ctx, email, code)
}

func (s *service) SendSomebodyLogin(ctx context.Context, email string) {
	s.provider.SendSomebodyLogin(ctx, email)
}

func (s *service) SendSomebodyTryLogin(ctx context.Context, email string) {
	s.provider.SendSomebodyTryLogin(ctx, email)
}

func (s *service) SendPasswordWasUpdate(ctx context.Context, email string) {
	s.provider.SendPasswordWasUpdate(ctx, email)
}

func (s *service) SendEmailWasUpdate(ctx context.Context, email string) {
	s.provider.SendEmailWasUpdate(ctx, email)
}

func (s *service) SendEmailConfirmCode(ctx context.Context, email, code string) {
	s.provider.SendEmailConfirmCode(ctx, email, code)
}
