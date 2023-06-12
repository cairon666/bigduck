package mailadapter

import (
	"context"

	"backend/internal/domain/models"
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

func (a *adapter) SendRecoverPasswordCode(ctx context.Context, data models.RecoverPassword) error {
	a.log.Info("mail message", logger.String("code", data.Code))
	return nil
}
