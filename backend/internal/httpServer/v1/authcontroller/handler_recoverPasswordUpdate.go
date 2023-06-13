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

	dto := authusecase.RecoverPasswordUpdateRequest{
		Email:    req.Email,
		Password: req.Password,
	}

	if err := c.authUsecase.RecoverPasswordUpdate(r.Context(), dto); err != nil {
		c.httpHelper.HandleError(w, err)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
