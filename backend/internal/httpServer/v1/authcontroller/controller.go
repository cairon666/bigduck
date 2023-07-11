package authcontroller

import (
	"context"

	"backend/internal/domain/usecases/authusecase"
	"backend/internal/httpServer/v1/authhelper"
	"backend/internal/httpServer/v1/httphelper"
	"github.com/go-chi/chi/v5"
)

//go:generate mockery --name AuthUsecase
type AuthUsecase interface { //nolint:interfacebloat
	Register(ctx context.Context, dto authusecase.RegisterRequest) error
	RecoverPasswordUpdate(ctx context.Context, req authusecase.RecoverPasswordUpdateRequest) error
	ChangePassword(ctx context.Context, dto authusecase.ChangePasswordRequest) error
	ConfirmEmailSend(ctx context.Context, dto authusecase.ConfirmEmailSendRequest) error
	ConfirmEmailConfirm(ctx context.Context, dto authusecase.ConfirmEmailConfirmRequest) error
	ChangeEmail(ctx context.Context, dto authusecase.ChangeEmailRequest) error
	RecoverPasswordConfirm(ctx context.Context, req authusecase.RecoverPasswordConfirmRequest) error
	RecoverPasswordSend(ctx context.Context, req authusecase.RecoverPasswordSendRequest) error
	Login(ctx context.Context, dto authusecase.LoginRequest) (authusecase.LoginResponse, error)
}

type Controller struct {
	authUsecase AuthUsecase
	httpHelper  *httphelper.HTTPHelper
	authHelper  *authhelper.AuthHelper
}

type Params struct {
	AuthUsecase AuthUsecase
	HTTPHelper  *httphelper.HTTPHelper
	AuthHelper  *authhelper.AuthHelper
}

func NewAuthController(params Params) *Controller {
	return &Controller{
		authUsecase: params.AuthUsecase,
		httpHelper:  params.HTTPHelper,
		authHelper:  params.AuthHelper,
	}
}

func (c *Controller) RegisterRouter(r chi.Router) {
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
	})
}
