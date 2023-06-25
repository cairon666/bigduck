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
	ctx := r.Context()

	var req recoverPasswordSendRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		c.httpHelper.HandleError(ctx, w, err)
		return
	}

	dto, err := authusecase.NewRecoverPasswordSendRequest(req.Email)
	if err != nil {
		c.httpHelper.HandleError(ctx, w, err)
		return
	}

	if err := c.authUsecase.RecoverPasswordSend(ctx, dto); err != nil {
		c.httpHelper.HandleError(ctx, w, err)
		return
	}

	w.WriteHeader(http.StatusOK)
}
