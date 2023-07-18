package usercontroller

import (
	"encoding/json"
	"net/http"

	"backend/internal/domain/usecases/userusecase"
	"backend/internal/exceptions/validate"
	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
)

type changeEmailRequest struct {
	Email string `json:"email"`
}

func (req *changeEmailRequest) IsValid() error {
	return validate.
		NewValidateError().
		AddField("email", validate.TestEmail(req.Email)).
		ToError()
}

func (c *Controller) changeEmailHandler(rw http.ResponseWriter, req *http.Request) {
	var (
		ctx    = req.Context()
		IDUser = uuid.Must(uuid.Parse(chi.URLParam(req, "IDUser")))
		reqDTO changeEmailRequest
	)

	if err := json.NewDecoder(req.Body).Decode(&reqDTO); err != nil {
		c.httpHelper.HandleError(ctx, rw, err)
		return
	}

	if err := reqDTO.IsValid(); err != nil {
		c.httpHelper.HandleError(ctx, rw, err)
		return
	}

	if err := c.authHelper.IsEqualOrAdmin(req, IDUser); err != nil {
		c.httpHelper.HandleError(ctx, rw, err)
		return
	}

	dto := userusecase.NewChangeEmailRequest(IDUser, reqDTO.Email)
	if err := c.userUsecase.ChangeEmail(ctx, dto); err != nil {
		c.httpHelper.HandleError(ctx, rw, err)
		return
	}

	rw.WriteHeader(http.StatusOK)
}
