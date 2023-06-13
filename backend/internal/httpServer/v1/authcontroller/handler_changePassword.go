package authcontroller

import (
	"encoding/json"
	"net/http"

	"backend/internal/domain/usecases/authusecase"
)

type changePasswordRequest struct {
	OldPassword string `json:"old_password"`
	NewPassword string `json:"new_password"`
}

func (c *controller) changePasswordHandler(rw http.ResponseWriter, req *http.Request) {
	var reqDTO changePasswordRequest
	if err := json.NewDecoder(req.Body).Decode(&reqDTO); err != nil {
		c.httpHelper.HandleError(rw, err)
		return
	}

	IDUser, ok := c.authHelper.ParseIDUser(req)
	if !ok {
		rw.WriteHeader(http.StatusForbidden)
		return
	}

	dto := authusecase.ChangePasswordRequest{
		OldPassword: reqDTO.OldPassword,
		NewPassword: reqDTO.NewPassword,
		IDUser:      IDUser,
	}

	err := c.authUsecase.ChangePassword(req.Context(), dto)
	if err != nil {
		c.httpHelper.HandleError(rw, err)
		return
	}

	rw.WriteHeader(http.StatusOK)
}
