package authcontroller

import (
	"encoding/json"
	"net/http"

	"backend/internal/domain/usecases/authusecase"
)

type confirmEmailConfirmRequest struct {
	Code string `json:"code"`
}

func (c *controller) confirmEmailConfirmHandler(rw http.ResponseWriter, req *http.Request) {
	var reqDTO confirmEmailConfirmRequest
	if err := json.NewDecoder(req.Body).Decode(&reqDTO); err != nil {
		c.httpHelper.HandleError(rw, err)
		return
	}

	IDUser, ok := c.authHelper.ParseIDUser(req)
	if !ok {
		rw.WriteHeader(http.StatusForbidden)
		return
	}

	dto := authusecase.ConfirmEmailConfirmRequest{
		IDUser: IDUser,
		Code:   reqDTO.Code,
	}

	err := c.authUsecase.ConfirmEmailConfirm(req.Context(), dto)
	if err != nil {
		c.httpHelper.HandleError(rw, err)
		return
	}

	rw.WriteHeader(http.StatusOK)
}
