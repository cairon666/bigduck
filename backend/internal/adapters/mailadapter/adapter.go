package mailadapter

import (
	"context"

	"backend/pkg/logger"
)

type adapter struct {
	log logger.Logger
}

func NewMailAdapter(log logger.Logger) *adapter {
	return &adapter{
		log: log,
	}
}

func (a *adapter) SendRecoverPasswordCode(ctx context.Context, email, code string) {
	a.log.Info("SendRecoverPasswordCode", logger.String("code", code), logger.String("email", email))
}

func (a *adapter) SendSomebodyLogin(ctx context.Context, email string) {
	a.log.Info("SendSomebodyLogin", logger.String("email", email))
}

func (a *adapter) SendSomebodyTryLogin(ctx context.Context, email string) {
	a.log.Info("SendSomebodyTryLogin", logger.String("email", email))
}

func (a *adapter) SendPasswordWasUpdate(ctx context.Context, email string) {
	a.log.Info("SendPasswordWasUpdate", logger.String("email", email))
}

func (a *adapter) SendEmailWasUpdate(ctx context.Context, email string) {
	a.log.Info("SendEmailWasUpdate", logger.String("email", email))
}

func (a *adapter) SendEmailConfirmCode(ctx context.Context, email, code string) {
	a.log.Info("SendEmailConfirmCode", logger.String("email", email), logger.String("code", code))
}
