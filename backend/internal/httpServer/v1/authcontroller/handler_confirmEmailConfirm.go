package authcontroller

import (
	"encoding/json"
	"net/http"

	"backend/internal/domain/usecases/authusecase"
	"backend/internal/exceptions"
	"backend/internal/exceptions/validate"
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

func (c *Controller) confirmEmailConfirmHandler(rw http.ResponseWriter, req *http.Request) {
	ctx := req.Context()

	var reqDTO confirmEmailConfirmRequest
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

	dto := authusecase.NewConfirmEmailConfirmRequest(IDUser, reqDTO.Code)
	if err := c.authUsecase.ConfirmEmailConfirm(ctx, dto); err != nil {
		c.httpHelper.HandleError(ctx, rw, err)
		return
	}

	rw.WriteHeader(http.StatusOK)
}
