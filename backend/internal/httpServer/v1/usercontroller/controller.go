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
}

type controller struct {
	userUsecase UserUsecase
	httpHelper  *httphelper.HTTPHelper
	authHelper  *authhelper.AuthHelper
}

type Params struct {
	UserUsecase UserUsecase
	HTTPHelper  *httphelper.HTTPHelper
	AuthHelper  *authhelper.AuthHelper
}

func NewController(params Params) *controller {
	return &controller{
		userUsecase: params.UserUsecase,
		authHelper:  params.AuthHelper,
		httpHelper:  params.HTTPHelper,
	}
}

func (c *controller) RegisterRouter(r chi.Router) {
	r.Route("/user", func(r chi.Router) {
		r.Get("/{IDUser}", c.getByIDHandler)
		r.Post("/{IDUser}", c.getByIDHandler)
		r.Delete("/{IDUser}", c.getByIDHandler)
	})
}
