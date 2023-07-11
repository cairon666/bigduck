package authcontroller

import (
	"net/http"

	"backend/internal/domain/usecases/authusecase"
	"backend/internal/exceptions"
)

func (c *Controller) confirmEmailSendHandler(rw http.ResponseWriter, req *http.Request) {
	ctx := req.Context()

	IDUser, ok := c.authHelper.ParseIDUser(req)
	if !ok {
		c.httpHelper.HandleError(ctx, rw, exceptions.ErrForbidden)
		return
	}

	dto := authusecase.NewConfirmEmailSendRequest(IDUser)
	if err := c.authUsecase.ConfirmEmailSend(ctx, dto); err != nil {
		c.httpHelper.HandleError(ctx, rw, err)
		return
	}

	rw.WriteHeader(http.StatusOK)
}
