package authcontroller

import (
	"encoding/json"
	"net/http"

	"backend/internal/domain/usecases/authusecase"
	"backend/internal/exceptions"
	"backend/internal/exceptions/validate"
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
	ctx := req.Context()

	var reqDTO changeEmailRequest
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

	dto := authusecase.NewChangeEmailRequest(IDUser, reqDTO.Email)
	if err := c.authUsecase.ChangeEmail(ctx, dto); err != nil {
		c.httpHelper.HandleError(ctx, rw, err)
		return
	}

	rw.WriteHeader(http.StatusOK)
}
