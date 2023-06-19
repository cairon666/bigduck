package authcontroller

import (
	"encoding/json"
	"net/http"

	"backend/internal/domain/usecases/authusecase"
)

type changeEmailRequest struct {
	Email string `json:"email"`
}

func (c *controller) changeEmailHandler(rw http.ResponseWriter, req *http.Request) {
	var reqDTO changeEmailRequest
	if err := json.NewDecoder(req.Body).Decode(&reqDTO); err != nil {
		c.httpHelper.HandleError(rw, err)
		return
	}

	IDUser, ok := c.authHelper.ParseIDUser(req)
	if !ok {
		rw.WriteHeader(http.StatusForbidden)
		return
	}

	dto, err := authusecase.NewChangeEmailRequest(reqDTO.Email, IDUser)
	if err != nil {
		c.httpHelper.HandleError(rw, err)
		return
	}

	if err := c.authUsecase.ChangeEmail(req.Context(), dto); err != nil {
		c.httpHelper.HandleError(rw, err)
		return
	}

	rw.WriteHeader(http.StatusOK)
}
