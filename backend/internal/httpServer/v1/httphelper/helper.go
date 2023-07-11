package httphelper

import (
	"backend/internal/config"
	"backend/pkg/logger"
)

type HTTPHelper struct {
	log  logger.Logger
	conf *config.Config
}

func NewHTTPHelper(log logger.Logger, conf *config.Config) *HTTPHelper {
	return &HTTPHelper{
		conf: conf,
		log:  log,
	}
}
