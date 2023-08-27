package usercontroller

import (
	"encoding/json"
	"net/http"

	"backend/internal/domain/usecases/userusecase"
	"backend/internal/exceptions/validate"
	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
)

type confirmEmailConfirmRequest struct {
	Code string `json:"code"`
}

func (req *confirmEmailConfirmRequest) IsValid() error {
	return validate.
		NewValidateError().
		AddField("code", validate.TestFourCode(req.Code)).
		ToError()
}

func (c *Controller) confirmEmailConfirmHandler(w http.ResponseWriter, r *http.Request) {
	var (
		ctx    = r.Context()
		IDUser = uuid.Must(uuid.Parse(chi.URLParam(r, "IDUser")))
		reqDTO confirmEmailConfirmRequest
	)

	if err := json.NewDecoder(r.Body).Decode(&reqDTO); err != nil {
		c.httpHelper.HandleError(ctx, w, err)
		return
	}

	if err := c.authHelper.IsEqualOrAdmin(r, IDUser); err != nil {
		c.httpHelper.HandleError(ctx, w, err)
		return
	}

	dto := userusecase.NewConfirmEmailConfirmRequest(IDUser, reqDTO.Code)
	if err := c.userUsecase.ConfirmEmailConfirm(ctx, dto); err != nil {
		c.httpHelper.HandleError(ctx, w, err)
		return
	}

	w.WriteHeader(http.StatusOK)
}
