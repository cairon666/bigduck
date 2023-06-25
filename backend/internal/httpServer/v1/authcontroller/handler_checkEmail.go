package authcontroller

import (
	"net/http"

	"backend/internal/domain/usecases/authusecase"
	"github.com/go-chi/chi/v5"
)

func (c *controller) checkEmailHandler(rw http.ResponseWriter, req *http.Request) {
	ctx := req.Context()

	email := chi.URLParam(req, "Email")

	dto, err := authusecase.NewCheckEmailIsAvailableRequest(email)
	if err != nil {
		c.httpHelper.HandleError(ctx, rw, err)
		return
	}

	if err := c.authUsecase.CheckEmailIsAvailable(ctx, dto); err != nil {
		c.httpHelper.HandleError(ctx, rw, err)
		return
	}

	rw.WriteHeader(http.StatusOK)
}
