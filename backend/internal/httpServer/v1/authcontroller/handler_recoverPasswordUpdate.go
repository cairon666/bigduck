package authcontroller

import (
	"encoding/json"
	"net/http"

	"backend/internal/domain/usecases/authusecase"
)

type recoverPasswordUpdateRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (c *controller) recoverPasswordUpdate(w http.ResponseWriter, r *http.Request) {
	var req recoverPasswordUpdateRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		c.httpHelper.HandleError(w, err)
		return
	}

	dto, err := authusecase.NewRecoverPasswordUpdateRequest(req.Email, req.Password)
	if err != nil {
		c.httpHelper.HandleError(w, err)
		return
	}

	if err := c.authUsecase.RecoverPasswordUpdate(r.Context(), dto); err != nil {
		c.httpHelper.HandleError(w, err)
		return
	}

	w.WriteHeader(http.StatusOK)
}
