package v1

import (
	"encoding/json"
	"net/http"

	"backend/internal/domain/usecases/authusecase"
	"backend/pkg/beda"
)

type loginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type loginResponse struct {
	IDUser      string `json:"id_user"`
	AccessToken string `json:"access_token"`
}

func (s *Server) loginHandler(rw http.ResponseWriter, req *http.Request) {
	var reqDTO loginRequest
	if err := json.NewDecoder(req.Body).Decode(&reqDTO); err != nil {
		s.handleError(rw, beda.Wrap("Decode", err))

		return
	}

	dto := authusecase.LoginRequest{
		Email:    reqDTO.Email,
		Password: reqDTO.Password,
	}

	resp, err := s.authUsecase.Login(req.Context(), dto)
	if err != nil {
		s.handleError(rw, beda.Wrap("Login", err))
		return
	}

	access, refresh, err := s.authHelper.NewTokens(resp.IDUser)
	if err != nil {
		s.handleError(rw, beda.Wrap("NewTokens", err))
		return
	}

	if err := s.authHelper.SetRefreshCookie(rw, refresh); err != nil {
		s.handleError(rw, beda.Wrap("SetRefreshCookie", err))

		return
	}

	s.sendJSON(rw, loginResponse{
		IDUser:      resp.IDUser,
		AccessToken: access,
	}, http.StatusOK)
}
