package authcontroller //nolint:dupl

import (
	"encoding/json"
	"net/http"

	"backend/internal/domain/usecases/authusecase"
)

type confirmEmailConfirmRequest struct {
	Code string `json:"code"`
}

func (c *controller) confirmEmailConfirmHandler(rw http.ResponseWriter, req *http.Request) {
	ctx := req.Context()

	var reqDTO confirmEmailConfirmRequest
	if err := json.NewDecoder(req.Body).Decode(&reqDTO); err != nil {
		c.httpHelper.HandleError(ctx, rw, err)
		return
	}

	IDUser, ok := c.authHelper.ParseIDUser(req)
	if !ok {
		rw.WriteHeader(http.StatusForbidden)
		return
	}

	dto, err := authusecase.NewConfirmEmailConfirmRequest(IDUser, reqDTO.Code)
	if err != nil {
		c.httpHelper.HandleError(ctx, rw, err)
		return
	}

	if err := c.authUsecase.ConfirmEmailConfirm(ctx, dto); err != nil {
		c.httpHelper.HandleError(ctx, rw, err)
		return
	}

	rw.WriteHeader(http.StatusOK)
}
