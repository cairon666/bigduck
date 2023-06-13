package authcontroller

import (
	"context"
	"net/http"

	"backend/internal/domain/usecases/authusecase"
	"github.com/go-chi/chi/v5"
)

//go:generate mockery --name AuthUsecase
type AuthUsecase interface {
	ChangeEmail(ctx context.Context, dto authusecase.ChangeEmailRequest) error
	Register(ctx context.Context, dto authusecase.RegisterRequest) error
	RecoverPasswordConfirm(ctx context.Context, req authusecase.RecoverPasswordConfirmRequest) error
	RecoverPasswordSend(ctx context.Context, req authusecase.RecoverPasswordSendRequest) error
	RecoverPasswordUpdate(ctx context.Context, req authusecase.RecoverPasswordUpdateRequest) error
	Login(ctx context.Context, dto authusecase.LoginRequest) (authusecase.LoginResponse, error)
	ChangePassword(ctx context.Context, dto authusecase.ChangePasswordRequest) error
	ConfirmEmailSend(ctx context.Context, dto authusecase.ConfirmEmailSendRequest) error
	ConfirmEmailConfirm(ctx context.Context, dto authusecase.ConfirmEmailConfirmRequest) error
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
	ParseIDUser(r *http.Request) (string, bool)
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
		r.Post("/change/email", c.changeEmailHandler)
		r.Post("/change/password", c.changePasswordHandler)
		r.Post("/confirm/email/send", c.confirmEmailSendHandler)       // send code to email
		r.Post("/confirm/email/confirm", c.confirmEmailConfirmHandler) // confirm sent code
		r.Post("/check/email/{Email} ", nil)                           // checking what email is available
	})
}
