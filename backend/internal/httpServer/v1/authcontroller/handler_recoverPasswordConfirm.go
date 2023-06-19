package authcontroller

import (
	"encoding/json"
	"net/http"

	"backend/internal/domain/usecases/authusecase"
)

type recoverPasswordConfirmRequest struct {
	Email string `json:"email"`
	Code  string `json:"code"`
}

func (c *controller) recoverPasswordConfirm(w http.ResponseWriter, r *http.Request) {
	var req recoverPasswordConfirmRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		c.httpHelper.HandleError(w, err)
		return
	}

	dto, err := authusecase.NewRecoverPasswordConfirmRequest(req.Email, req.Code)
	if err != nil {
		c.httpHelper.HandleError(w, err)
		return
	}

	if err := c.authUsecase.RecoverPasswordConfirm(r.Context(), dto); err != nil {
		c.httpHelper.HandleError(w, err)
		return
	}

	w.WriteHeader(http.StatusOK)
}
