package authcontroller

import (
	"encoding/json"
	"net/http"

	"backend/internal/domain/usecases/authusecase"
	"backend/internal/exceptions/validate"
)

type recoverPasswordConfirmRequest struct {
	Email string `json:"email"`
	Code  string `json:"code"`
}

func (req *recoverPasswordConfirmRequest) IsValid() error {
	return validate.NewValidateError().
		AddField("email", validate.TestEmail(req.Email)).
		AddField("code", validate.TestFourCode(req.Code)).
		ToError()
}

func (c *Controller) recoverPasswordConfirm(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	var reqDTO recoverPasswordConfirmRequest
	if err := json.NewDecoder(r.Body).Decode(&reqDTO); err != nil {
		c.httpHelper.HandleError(ctx, w, err)
		return
	}

	if err := reqDTO.IsValid(); err != nil {
		c.httpHelper.HandleError(ctx, w, err)
		return
	}

	dto := authusecase.NewRecoverPasswordConfirmRequest(reqDTO.Email, reqDTO.Code)

	if err := c.authUsecase.RecoverPasswordConfirm(ctx, dto); err != nil {
		c.httpHelper.HandleError(ctx, w, err)
		return
	}

	w.WriteHeader(http.StatusOK)
}
