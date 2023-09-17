package authcontroller

import (
	"encoding/json"
	"net/http"

	"backend/internal/domain/usecases/authusecase"
	"backend/internal/exceptions/validate"

	"github.com/google/uuid"
)

type loginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (req *loginRequest) IsValid() error {
	return validate.NewValidateError().
		AddField("email", validate.TestEmail(req.Email)).
		AddField("password", validate.TestPassword(req.Password)).
		ToError()
}

type loginResponse struct {
	IDUser      uuid.UUID `json:"id_user"`
	AccessToken string    `json:"access_token"`
}

func (c *Controller) loginHandler(rw http.ResponseWriter, req *http.Request) {
	ctx := req.Context()

	var reqDTO loginRequest
	if err := json.NewDecoder(req.Body).Decode(&reqDTO); err != nil {
		c.httpHelper.HandleError(ctx, rw, err)
		return
	}

	if err := reqDTO.IsValid(); err != nil {
		c.httpHelper.HandleError(ctx, rw, err)
		return
	}

	dto := authusecase.NewLoginRequest(reqDTO.Email, reqDTO.Password)

	resp, err := c.authUsecase.Login(ctx, dto)
	if err != nil {
		c.httpHelper.HandleError(ctx, rw, err)
		return
	}

	access, refresh, err := c.authHelper.NewTokens(resp.IDUser, resp.Roles)
	if err != nil {
		c.httpHelper.HandleError(ctx, rw, err)
		return
	}

	if err := c.authHelper.SetRefreshCookie(rw, refresh); err != nil {
		c.httpHelper.HandleError(ctx, rw, err)
		return
	}

	c.httpHelper.SendJSON(rw, loginResponse{
		IDUser:      resp.IDUser,
		AccessToken: access,
	}, http.StatusOK)
}
