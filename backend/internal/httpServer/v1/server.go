package v1

import (
	"context"
	"fmt"
	"net/http"

	"backend/internal/config"
	"backend/internal/domain/usecases/attachmentusecase"
	"backend/internal/domain/usecases/authusecase"
	"backend/internal/domain/usecases/userusecase"
	"backend/internal/httpServer/v1/attachmentcontroller"
	"backend/internal/httpServer/v1/authcontroller"
	"backend/internal/httpServer/v1/authhelper"
	"backend/internal/httpServer/v1/httphelper"
	"backend/internal/httpServer/v1/usercontroller"
	"backend/pkg/logger"

	"github.com/go-chi/chi/v5"
	"go.uber.org/dig"
)

type AuthHelper interface {
	AuthorizationMiddleware(next http.Handler) http.Handler
}

type Controller interface {
	RegisterRouter(r chi.Router)
}

type Server struct {
	authController       Controller
	userController       Controller
	attachmentController Controller
	authHelper           AuthHelper

	conf   *config.Config
	server *http.Server
	log    logger.Logger
}

type Params struct {
	dig.In

	Log              logger.Logger
	Conf             *config.Config
	AuthUsecase      *authusecase.Usecase
	UserUsecase      *userusecase.Usecase
	AttachentUsecase *attachmentusecase.Usecase
}

func NewServer(params Params) *Server {
	httpHelper := httphelper.NewHTTPHelper(params.Log, params.Conf)
	authHelper := authhelper.NewAuthHelper(authhelper.Props{
		Issuer:     params.Conf.HTTP.Domain,
		Private:    []byte(params.Conf.JWT.Private),
		TTLAccess:  params.Conf.JWT.TTLAccess,
		TTLRefresh: params.Conf.JWT.TTLRefresh,
	})

	return &Server{
		conf:       params.Conf,
		log:        params.Log,
		authHelper: authHelper,
		authController: authcontroller.NewAuthController(authcontroller.Params{
			AuthUsecase: params.AuthUsecase,
			HTTPHelper:  httpHelper,
			AuthHelper:  authHelper,
		}),
		userController: usercontroller.NewController(usercontroller.Params{
			UserUsecase: params.UserUsecase,
			HTTPHelper:  httpHelper,
			AuthHelper:  authHelper,
		}),
		attachmentController: attachmentcontroller.NewController(attachmentcontroller.Params{
			AttachmentUsecase: params.AttachentUsecase,
			HTTPHelper:        httpHelper,
			AuthHelper:        authHelper,
		}),
	}
}

func (s *Server) ListenAndServe() error {
	server := &http.Server{
		Addr:              fmt.Sprintf("%s:%s", s.conf.HTTP.Address, s.conf.HTTP.Port),
		Handler:           s.router(),
		ReadTimeout:       s.conf.HTTP.ReadTimeout,
		ReadHeaderTimeout: s.conf.HTTP.ReadHeaderTimeout,
		WriteTimeout:      s.conf.HTTP.WriteTimeout,
		IdleTimeout:       s.conf.HTTP.IdleTimeout,
	}

	s.server = server

	return server.ListenAndServe()
}

func (s *Server) Shutdown(ctx context.Context) error {
	return s.server.Shutdown(ctx)
}

func (s *Server) SetKeepAlivesEnabled(v bool) {
	s.server.SetKeepAlivesEnabled(v)
}
