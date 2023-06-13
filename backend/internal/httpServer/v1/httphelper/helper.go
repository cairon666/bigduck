package httphelper

import (
	"backend/internal/config"
	"backend/pkg/logger"
)

type httpHelper struct {
	log  logger.Logger
	conf *config.Config
}

func NewHTTPHelper(log logger.Logger, conf *config.Config) *httpHelper {
	return &httpHelper{
		conf: conf,
		log:  log,
	}
}
