package authcontroller

import (
	"context"
	"net/http"

	"backend/internal/domain/usecases/authusecase"
	"github.com/go-chi/chi/v5"
)

//go:generate mockery --name AuthUsecase
type AuthUsecase interface {
	Login(ctx context.Context, dto authusecase.LoginRequest) (authusecase.LoginResponse, error)
	Register(ctx context.Context, dto authusecase.RegisterRequest) error
	RecoverPasswordSend(ctx context.Context, req authusecase.RecoverPasswordSendRequest) error
	RecoverPasswordConfirm(ctx context.Context, req authusecase.RecoverPasswordConfirmRequest) error
	RecoverPasswordUpdate(ctx context.Context, req authusecase.RecoverPasswordUpdateRequest) error
}

//go:generate mockery --name HTTPHelper
type HTTPHelper interface {
	HandleError(w http.ResponseWriter, err error)
	SendJSON(w http.ResponseWriter, data any, status int)
}

//go:generate mockery --name AuthHelper
type AuthHelper interface {
	ClearRefreshCookie(w http.ResponseWriter)
	GetRefreshCookie(r *http.Request) (string, error)
	SetRefreshCookie(w http.ResponseWriter, refresh string) error
	NewTokens(IDUser string) (string, string, error)
	UpdateTokens(refresh string) (string, string, error)
}

type controller struct {
	authUsecase AuthUsecase
	httpHelper  HTTPHelper
	authHelper  AuthHelper
}

type Params struct {
	AuthUsecase AuthUsecase
	HTTPHelper  HTTPHelper
	AuthHelper  AuthHelper
}

func NewAuthController(params Params) *controller {
	return &controller{
		authUsecase: params.AuthUsecase,
		httpHelper:  params.HTTPHelper,
		authHelper:  params.AuthHelper,
	}
}

func (c *controller) RegisterRouter(r chi.Router) {
	r.Route("/auth", func(r chi.Router) {
		r.Post("/register", c.registerHandler)
		r.Post("/login", c.loginHandler)
		r.Post("/refresh", c.refreshHandler)
		r.Post("/logout", c.logoutHandler)
		r.Post("/recover/password/send", c.recoverPasswordSend)       // send code to email
		r.Post("/recover/password/confirm", c.recoverPasswordConfirm) // confirm code
		r.Post("/recover/password/update", c.recoverPasswordUpdate)   // update password
	})
}
