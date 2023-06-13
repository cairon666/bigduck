package authcontroller

import (
	"encoding/json"
	"net/http"

	"backend/internal/domain/usecases/authusecase"
)

type recoverPasswordSendRequest struct {
	Email string `json:"email"`
}

func (c *controller) recoverPasswordSend(w http.ResponseWriter, r *http.Request) {
	var req recoverPasswordSendRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		c.httpHelper.HandleError(w, err)
		return
	}

	dto := authusecase.RecoverPasswordSendRequest{Email: req.Email}

	if err := c.authUsecase.RecoverPasswordSend(r.Context(), dto); err != nil {
		c.httpHelper.HandleError(w, err)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
