package authcontroller

import (
	"net/http"

	"backend/internal/domain/usecases/authusecase"
)

func (c *controller) confirmEmailSendHandler(rw http.ResponseWriter, req *http.Request) {
	ctx := req.Context()

	IDUser, ok := c.authHelper.ParseIDUser(req)
	if !ok {
		rw.WriteHeader(http.StatusForbidden)
		return
	}

	dto, err := authusecase.NewConfirmEmailSendRequest(IDUser)
	if err != nil {
		c.httpHelper.HandleError(ctx, rw, err)
		return
	}

	if err := c.authUsecase.ConfirmEmailSend(ctx, dto); err != nil {
		c.httpHelper.HandleError(ctx, rw, err)
		return
	}

	rw.WriteHeader(http.StatusOK)
}
