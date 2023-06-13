package authcontroller

import (
	"net/http"

	"backend/internal/domain/usecases/authusecase"
)

func (c *controller) confirmEmailSendHandler(rw http.ResponseWriter, req *http.Request) {
	IDUser, ok := c.authHelper.ParseIDUser(req)
	if !ok {
		rw.WriteHeader(http.StatusForbidden)
		return
	}

	dto := authusecase.ConfirmEmailSendRequest{
		IDUser: IDUser,
	}

	err := c.authUsecase.ConfirmEmailSend(req.Context(), dto)
	if err != nil {
		c.httpHelper.HandleError(rw, err)
		return
	}

	rw.WriteHeader(http.StatusOK)
}
