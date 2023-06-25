package usercontroller

import (
	"context"
	"net/http"

	"backend/internal/domain/usecases/userusecase"
	"github.com/go-chi/chi/v5"
)

//go:generate mockery --name UserUsecase
type UserUsecase interface {
	GetByID(ctx context.Context, req userusecase.GetByIDRequest) (userusecase.GetByIDResponse, error)
}

//go:generate mockery --name HTTPHelper
type HTTPHelper interface {
	HandleError(ctx context.Context, w http.ResponseWriter, err error)
	SendJSON(w http.ResponseWriter, data any, status int)
}

//go:generate mockery --name AuthHelper
type AuthHelper interface {
	IsEqualIDUser(r *http.Request, id string) error
}

type controller struct {
	userUsecase UserUsecase
	httpHelper  HTTPHelper
	authHelper  AuthHelper
}

type Params struct {
	UserUsecase UserUsecase
	HTTPHelper  HTTPHelper
	AuthHelper  AuthHelper
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
	})
}
