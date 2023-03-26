package v1

import (
	"backend/internal/authHelper"
	"backend/internal/config"
	"backend/internal/domain/usecases/authUsecase"
	"backend/internal/domain/usecases/userUsecase"
	"backend/pkg/logger"
	"context"
	"fmt"
	"go.uber.org/dig"
	"net"
	"net/http"
	"time"
)

//go:generate mockery --name UserUsecase
type UserUsecase interface {
	ReadById(ctx context.Context, dto userUsecase.ReadByIdRequest) (*userUsecase.ReadByIdResponse, error)
	UpdateById(ctx context.Context, dto userUsecase.UpdateByIdRequest) error
	DeleteById(ctx context.Context, dto userUsecase.DeleteByIdRequest) error
}

//go:generate mockery --name AuthUsecase
type AuthUsecase interface {
	Login(ctx context.Context, dto authUsecase.LoginRequest) (*authUsecase.LoginResponse, error)
	Register(ctx context.Context, dto authUsecase.RegisterRequest) error
}

type Server interface {
	Run() error
}

type server struct {
	log         logger.Logger
	conf        *config.Config
	authHelper  authHelper.Helper
	authUsecase AuthUsecase
	userUsecase UserUsecase
}

type ServerParams struct {
	dig.In

	AuthUsecase AuthUsecase
	UserUsecase UserUsecase
}

func NewServer(log logger.Logger, conf *config.Config, params ServerParams) Server {
	return &server{
		conf:        conf,
		log:         log,
		authUsecase: params.AuthUsecase,
		userUsecase: params.UserUsecase,
		authHelper: authHelper.NewHelper(authHelper.HelperProps{
			Issuer:     conf.APP.DOMAIN,
			Private:    []byte(conf.JWT.PRIVATE),
			TtlAccess:  time.Hour,
			TtlRefresh: time.Hour * 24 * 30,
		}),
	}
}

func (s *server) Run() error {
	lis, err := net.Listen("tcp", fmt.Sprintf("%s:%s", s.conf.APP.ADDRESS, s.conf.APP.PORT))
	if err != nil {
		return err
	}

	return http.Serve(lis, s.router())
}
