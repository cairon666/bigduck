package http

import (
	"authService/internal/config"
	"authService/internal/domain/usecases/authentication"
	"authService/pkg/jwt"
	"authService/pkg/logger"
	"fmt"
	"net"
	"net/http"
)

type Server interface {
	Run() error
}

type server struct {
	log         logger.Logger
	conf        *config.Config
	helper      jwt.Helper
	authUsecase authentication.AuthUsecase
}

func NewServer(conf *config.Config, log logger.Logger, authUsecase authentication.AuthUsecase) Server {
	return &server{
		conf:        conf,
		log:         log,
		helper:      jwt.NewHelper(conf.AUTHORIZATION.PRIVATE),
		authUsecase: authUsecase,
	}
}

func (s *server) Run() error {
	l, err := net.Listen("tcp", fmt.Sprintf("%s:%s", s.conf.APP.ADDRESS, s.conf.APP.PORT))
	if err != nil {
		return err
	}
	return http.Serve(l, s.router())
}
