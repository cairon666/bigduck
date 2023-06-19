package usercontroller

import (
	"context"
	"net/http"

	"backend/internal/domain/usecases/userusecase"
	"github.com/go-chi/chi/v5"
)

//go:generate mockery --name UserUsecase
type UserUsecase interface {
	ReadByID(ctx context.Context, dto userusecase.ReadByIDRequest) (userusecase.ReadByIDResponse, error)
	UpdateByID(ctx context.Context, dto userusecase.UpdateByIDRequest) error
}

//go:generate mockery --name HTTPHelper
type HTTPHelper interface {
	HandleError(rw http.ResponseWriter, err error)
	SendJSON(rw http.ResponseWriter, data any, status int)
}

//go:generate mockery --name AuthHelper
type AuthHelper interface {
	IsEqualIDUser(r *http.Request, IDUser string) bool
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

func NewUserController(params Params) *controller {
	return &controller{
		userUsecase: params.UserUsecase,
		httpHelper:  params.HTTPHelper,
		authHelper:  params.AuthHelper,
	}
}

func (c *controller) RegisterRouter(r chi.Router) {
	r.Route("/user", func(r chi.Router) {
		r.Get("/{IDUser}", c.getUserByID)
		r.Put("/{IDUser}", c.updateUserByID)
	})
}
