package authcontroller

import (
	"encoding/json"
	"net/http"

	"backend/internal/domain/usecases/authusecase"
	"backend/internal/exceptions/validate"
)

type recoverPasswordSendRequest struct {
	Email string `json:"email"`
}

func (req *recoverPasswordSendRequest) IsValid() error {
	return validate.NewValidateError().
		AddField("email", validate.TestEmail(req.Email)).
		ToError()
}

func (c *Controller) recoverPasswordSend(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	var reqDTO recoverPasswordSendRequest
	if err := json.NewDecoder(r.Body).Decode(&reqDTO); err != nil {
		c.httpHelper.HandleError(ctx, w, err)
		return
	}

	if err := reqDTO.IsValid(); err != nil {
		c.httpHelper.HandleError(ctx, w, err)
		return
	}

	dto := authusecase.NewRecoverPasswordSendRequest(reqDTO.Email)

	if err := c.authUsecase.RecoverPasswordSend(ctx, dto); err != nil {
		c.httpHelper.HandleError(ctx, w, err)
		return
	}

	w.WriteHeader(http.StatusOK)
}
