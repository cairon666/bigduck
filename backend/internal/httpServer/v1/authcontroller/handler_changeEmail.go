package authcontroller //nolint:dupl

import (
	"encoding/json"
	"net/http"

	"backend/internal/domain/usecases/authusecase"
)

type changeEmailRequest struct {
	Email string `json:"email"`
}

func (c *controller) changeEmailHandler(rw http.ResponseWriter, req *http.Request) {
	ctx := req.Context()

	var reqDTO changeEmailRequest
	if err := json.NewDecoder(req.Body).Decode(&reqDTO); err != nil {
		c.httpHelper.HandleError(ctx, rw, err)
		return
	}

	IDUser, ok := c.authHelper.ParseIDUser(req)
	if !ok {
		rw.WriteHeader(http.StatusForbidden)
		return
	}

	dto, err := authusecase.NewChangeEmailRequest(IDUser, reqDTO.Email)
	if err != nil {
		c.httpHelper.HandleError(ctx, rw, err)
		return
	}

	if err := c.authUsecase.ChangeEmail(ctx, dto); err != nil {
		c.httpHelper.HandleError(ctx, rw, err)
		return
	}

	rw.WriteHeader(http.StatusOK)
}
