package v1

import (
	"context"
	"fmt"
	"net/http"

	"backend/internal/authhelper"
	"backend/internal/config"
	"backend/internal/domain/usecases/authusecase"
	"backend/internal/domain/usecases/userusecase"
	"backend/pkg/logger"
	"github.com/pkg/errors"
	"go.uber.org/dig"
)

//go:generate mockery --name UserUsecase
type UserUsecase interface {
	ReadByID(ctx context.Context, dto userusecase.ReadByIDRequest) (userusecase.ReadByIDResponse, error)
	UpdateByID(ctx context.Context, dto userusecase.UpdateByIDRequest) error
	DeleteByID(ctx context.Context, dto userusecase.DeleteByIDRequest) error
}

//go:generate mockery --name AuthUsecase
type AuthUsecase interface {
	Login(ctx context.Context, dto authusecase.LoginRequest) (authusecase.LoginResponse, error)
	Register(ctx context.Context, dto authusecase.RegisterRequest) error
}

type Server struct {
	log         logger.Logger
	conf        *config.Config
	authHelper  *authhelper.Helper
	authUsecase AuthUsecase
	userUsecase UserUsecase
}

type ServerParams struct {
	dig.In

	AuthUsecase AuthUsecase
	UserUsecase UserUsecase
}

func NewServer(log logger.Logger, conf *config.Config, params ServerParams) *Server {
	return &Server{
		conf:        conf,
		log:         log,
		authUsecase: params.AuthUsecase,
		userUsecase: params.UserUsecase,
		authHelper: authhelper.NewHelper(authhelper.HelperProps{
			Issuer:     conf.App.Domain,
			Private:    []byte(conf.JWT.Private),
			TTLAccess:  conf.JWT.TTLAccess,
			TTLRefresh: conf.JWT.TTLRefresh,
		}),
	}
}

func (s *Server) Run() error {
	server := http.Server{
		Addr:              fmt.Sprintf("%s:%s", s.conf.App.Address, s.conf.App.Port),
		Handler:           s.router(),
		ReadTimeout:       s.conf.App.ReadTimeout,
		ReadHeaderTimeout: s.conf.App.ReadHeaderTimeout,
		WriteTimeout:      s.conf.App.WriteTimeout,
		IdleTimeout:       s.conf.App.IdleTimeout,
	}

	if err := server.ListenAndServe(); err != nil {
		return errors.Wrap(err, "Serve: ")
	}

	return nil
}
