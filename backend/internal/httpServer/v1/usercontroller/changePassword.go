package usercontroller

import (
	"encoding/json"
	"net/http"

	"backend/internal/domain/usecases/userusecase"
	"backend/internal/exceptions/validate"
	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
)

type changePasswordRequest struct {
	OldPassword string `json:"old_password"`
	NewPassword string `json:"new_password"`
}

func (req *changePasswordRequest) IsValid() error {
	return validate.NewValidateError().
		AddField("old_password", validate.TestPassword(req.OldPassword)).
		AddField("new_password", validate.TestPassword(req.NewPassword)).
		ToError()
}

func (c *Controller) changePasswordHandler(rw http.ResponseWriter, req *http.Request) {
	var (
		ctx    = req.Context()
		IDUser = uuid.Must(uuid.Parse(chi.URLParam(req, "IDUser")))
		reqDTO changePasswordRequest
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

	dto := userusecase.NewChangePasswordRequest(IDUser, reqDTO.OldPassword, reqDTO.NewPassword)
	if err := c.userUsecase.ChangePassword(ctx, dto); err != nil {
		c.httpHelper.HandleError(ctx, rw, err)
		return
	}

	rw.WriteHeader(http.StatusOK)
}
