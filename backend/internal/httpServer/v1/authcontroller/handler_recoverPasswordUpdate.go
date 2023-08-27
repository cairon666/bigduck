package authcontroller

import (
	"encoding/json"
	"net/http"

	"backend/internal/domain/usecases/authusecase"
	"backend/internal/exceptions/validate"
)

type recoverPasswordUpdateRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (req *recoverPasswordUpdateRequest) IsValid() error {
	return validate.NewValidateError().
		AddField("email", validate.TestEmail(req.Email)).
		AddField("password", validate.TestPassword(req.Password)).
		ToError()
}

func (c *Controller) recoverPasswordUpdate(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	var reqDTO recoverPasswordUpdateRequest
	if err := json.NewDecoder(r.Body).Decode(&reqDTO); err != nil {
		c.httpHelper.HandleError(ctx, w, err)
		return
	}

	if err := reqDTO.IsValid(); err != nil {
		c.httpHelper.HandleError(ctx, w, err)
		return
	}

	dto := authusecase.NewRecoverPasswordUpdateRequest(reqDTO.Email, reqDTO.Password)

	if err := c.authUsecase.RecoverPasswordUpdate(ctx, dto); err != nil {
		c.httpHelper.HandleError(ctx, w, err)
		return
	}

	w.WriteHeader(http.StatusOK)
}
