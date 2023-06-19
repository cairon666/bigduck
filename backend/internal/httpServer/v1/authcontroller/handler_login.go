package authcontroller

import (
	"encoding/json"
	"net/http"

	"backend/internal/domain/usecases/authusecase"
)

type loginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type loginResponse struct {
	IDUser      string `json:"id_user"`
	AccessToken string `json:"access_token"`
}

func (c *controller) loginHandler(rw http.ResponseWriter, req *http.Request) {
	var reqDTO loginRequest
	if err := json.NewDecoder(req.Body).Decode(&reqDTO); err != nil {
		c.httpHelper.HandleError(rw, err)
		return
	}

	dto, err := authusecase.NewLoginRequest(reqDTO.Email, reqDTO.Password)
	if err != nil {
		c.httpHelper.HandleError(rw, err)
		return
	}

	resp, err := c.authUsecase.Login(req.Context(), dto)
	if err != nil {
		c.httpHelper.HandleError(rw, err)
		return
	}

	access, refresh, err := c.authHelper.NewTokens(resp.IDUser)
	if err != nil {
		c.httpHelper.HandleError(rw, err)
		return
	}

	if err := c.authHelper.SetRefreshCookie(rw, refresh); err != nil {
		c.httpHelper.HandleError(rw, err)
		return
	}

	c.httpHelper.SendJSON(rw, loginResponse{
		IDUser:      resp.IDUser,
		AccessToken: access,
	}, http.StatusOK)
}
