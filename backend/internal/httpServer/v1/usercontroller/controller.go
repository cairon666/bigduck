package usercontroller

import (
	"context"

	"backend/internal/domain/usecases/userusecase"
	"backend/internal/httpServer/v1/authhelper"
	"backend/internal/httpServer/v1/httphelper"
	"github.com/go-chi/chi/v5"
)

//go:generate mockery --name UserUsecase
type UserUsecase interface {
	GetByID(ctx context.Context, req userusecase.GetByIDRequest) (userusecase.GetByIDResponse, error)
	ChangePassword(ctx context.Context, dto userusecase.ChangePasswordRequest) error
	ChangeEmail(ctx context.Context, dto userusecase.ChangeEmailRequest) error
	ConfirmEmailConfirm(ctx context.Context, dto userusecase.ConfirmEmailConfirmRequest) error
	ConfirmEmailSend(ctx context.Context, dto userusecase.ConfirmEmailSendRequest) error
}

type Controller struct {
	userUsecase UserUsecase
	httpHelper  *httphelper.HTTPHelper
	authHelper  *authhelper.AuthHelper
}

type Params struct {
	UserUsecase UserUsecase
	HTTPHelper  *httphelper.HTTPHelper
	AuthHelper  *authhelper.AuthHelper
}

func NewController(params Params) *Controller {
	return &Controller{
		userUsecase: params.UserUsecase,
		authHelper:  params.AuthHelper,
		httpHelper:  params.HTTPHelper,
	}
}

func (c *Controller) RegisterRouter(r chi.Router) {
	r.Route("/user", func(r chi.Router) {
		r.Get("/{IDUser}", c.getByIDHandler)
		r.Post("/{IDUser}", c.getByIDHandler)
		r.Delete("/{IDUser}", c.getByIDHandler)
		r.Post("/change/email/{IDUser}", c.changeEmailHandler)
		r.Post("/change/password/{IDUser}", c.changePasswordHandler)
		r.Post("/confirm/email/{IDUser}/send", c.confirmEmailSendHandler)
		r.Post("/confirm/email/{IDUser}/confirm", c.confirmEmailConfirmHandler)
	})
}
