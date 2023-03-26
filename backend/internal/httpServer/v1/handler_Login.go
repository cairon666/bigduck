package v1

import (
	"backend/internal/domain/usecases/authUsecase"
	"backend/pkg/beda"
	"encoding/json"
	"net/http"
)

type loginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type loginResponse struct {
	IdUser      string `json:"id_user"`
	AccessToken string `json:"access_token"`
}

func (s *server) loginHandler(rw http.ResponseWriter, req *http.Request) {
	var reqDTO loginRequest
	if err := json.NewDecoder(req.Body).Decode(&reqDTO); err != nil {
		s.handleError(rw, beda.Wrap("Decode", err))
		return
	}

	dto := authUsecase.LoginRequest{
		Email:    reqDTO.Email,
		Password: reqDTO.Password,
	}
	resp, err := s.authUsecase.Login(req.Context(), dto)
	if err != nil {
		s.handleError(rw, beda.Wrap("Login", err))
		return
	}

	access, refresh, err := s.authHelper.NewTokens(resp.IdUser)
	if err != nil {
		s.handleError(rw, beda.Wrap("NewTokens", err))
		return
	}

	if err := s.authHelper.SetRefreshCookie(rw, refresh); err != nil {
		s.handleError(rw, beda.Wrap("SetRefreshCookie", err))
		return
	}

	s.sendJSON(rw, loginResponse{
		IdUser:      resp.IdUser,
		AccessToken: access,
	}, http.StatusOK)
}
