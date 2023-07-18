package usercontroller

import (
	"net/http"

	"backend/internal/domain/usecases/userusecase"
	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
)

func (c *Controller) confirmEmailSendHandler(w http.ResponseWriter, r *http.Request) {
	var (
		ctx    = r.Context()
		IDUser = uuid.Must(uuid.Parse(chi.URLParam(r, "IDUser")))
	)

	if err := c.authHelper.IsEqualOrAdmin(r, IDUser); err != nil {
		c.httpHelper.HandleError(ctx, w, err)
		return
	}

	dto := userusecase.NewConfirmEmailSendRequest(IDUser)

	if err := c.userUsecase.ConfirmEmailSend(ctx, dto); err != nil {
		c.httpHelper.HandleError(ctx, w, err)
		return
	}

	w.WriteHeader(http.StatusOK)
}
