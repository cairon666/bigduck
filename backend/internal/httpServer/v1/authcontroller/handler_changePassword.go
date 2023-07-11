package authcontroller

import (
	"encoding/json"
	"net/http"

	"backend/internal/domain/usecases/authusecase"
	"backend/internal/exceptions"
	"backend/internal/exceptions/validate"
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
	ctx := req.Context()

	var reqDTO changePasswordRequest
	if err := json.NewDecoder(req.Body).Decode(&reqDTO); err != nil {
		c.httpHelper.HandleError(ctx, rw, err)
		return
	}

	if err := reqDTO.IsValid(); err != nil {
		c.httpHelper.HandleError(ctx, rw, err)
		return
	}

	IDUser, ok := c.authHelper.ParseIDUser(req)
	if !ok {
		c.httpHelper.HandleError(ctx, rw, exceptions.ErrForbidden)
		return
	}

	dto := authusecase.NewChangePasswordRequest(IDUser, reqDTO.OldPassword, reqDTO.NewPassword)
	if err := c.authUsecase.ChangePassword(ctx, dto); err != nil {
		c.httpHelper.HandleError(ctx, rw, err)
		return
	}

	rw.WriteHeader(http.StatusOK)
}
