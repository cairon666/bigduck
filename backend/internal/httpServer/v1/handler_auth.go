package v1

import (
	"encoding/json"
	"net/http"
	"time"

	"backend/internal/domain/usecases/authusecase"
)

// -----------------------------------------------------

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
		s.handleError(rw, err)
		return
	}

	dto := authusecase.LoginRequest{
		Email:    reqDTO.Email,
		Password: reqDTO.Password,
	}

	resp, err := s.authUsecase.Login(req.Context(), dto)
	if err != nil {
		s.handleError(rw, err)
		return
	}

	access, refresh, err := s.authHelper.NewTokens(resp.IDUser)
	if err != nil {
		s.handleError(rw, err)
		return
	}

	if err := s.authHelper.SetRefreshCookie(rw, refresh); err != nil {
		s.handleError(rw, err)
		return
	}

	s.sendJSON(rw, loginResponse{
		IDUser:      resp.IDUser,
		AccessToken: access,
	}, http.StatusOK)
}

// -----------------------------------------------------

func (s *Server) logoutHandler(rw http.ResponseWriter, _ *http.Request) {
	s.authHelper.ClearRefreshCookie(rw)
}

// -----------------------------------------------------

type refreshResponse struct {
	AccessToken string `json:"access_token"`
}

func (s *Server) refreshHandler(rw http.ResponseWriter, r *http.Request) {
	refresh, err := s.authHelper.GetRefreshCookie(r)
	if err != nil {
		s.handleError(rw, err)

		return
	}

	newAccess, newRefresh, err := s.authHelper.UpdateTokens(refresh)
	if err != nil {
		s.handleError(rw, err)

		return
	}

	if err := s.authHelper.SetRefreshCookie(rw, newRefresh); err != nil {
		s.handleError(rw, err)

		return
	}

	s.sendJSON(rw, refreshResponse{AccessToken: newAccess}, http.StatusOK)
}

// -----------------------------------------------------

type registerRequest struct {
	Email       string     `json:"email"`
	Password    string     `json:"password"`
	FirstName   string     `json:"first_name"`
	SecondName  string     `json:"second_name"`
	Gender      *string    `json:"gender,omitempty"`
	DateOfBirth *time.Time `json:"date_of_birth,omitempty"`
	AvatarURL   *string    `json:"avatar_url,omitempty"`
}

type registerResponse struct {
}

func (s *Server) registerHandler(rw http.ResponseWriter, req *http.Request) {
	var reqDTO registerRequest
	if err := json.NewDecoder(req.Body).Decode(&reqDTO); err != nil {
		s.handleError(rw, err)

		return
	}

	dto := authusecase.RegisterRequest{
		Email:       reqDTO.Email,
		Password:    reqDTO.Password,
		FirstName:   reqDTO.FirstName,
		SecondName:  reqDTO.SecondName,
		Gender:      reqDTO.Gender,
		DateOfBirth: reqDTO.DateOfBirth,
		AvatarURL:   reqDTO.AvatarURL,
	}

	if err := s.authUsecase.Register(req.Context(), dto); err != nil {
		s.handleError(rw, err)
		return
	}

	s.sendJSON(rw, registerResponse{}, http.StatusOK)
}
