package http

import (
	"authService/internal/domain/usecases/authentication"
	"authService/pkg/beda"
	"encoding/json"
	"net/http"
	"time"
)

type loginDTO struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type loginResponseDTO struct {
	IdUser      string `json:"id_user"`
	AccessToken string `json:"access_token"`
}

func (s *server) loginHandler(rw http.ResponseWriter, req *http.Request) {
	var loginReq loginDTO
	err := json.NewDecoder(req.Body).Decode(&loginReq)
	if err != nil {
		s.handleError(rw, err)
		return
	}

	dtoUsecase := authentication.LoginRequestDTO{
		Email:    loginReq.Email,
		Password: loginReq.Password,
	}
	usecaseReq, err := s.authUsecase.Login(req.Context(), dtoUsecase)
	if err != nil {
		s.handleError(rw, err)
		return
	}

	pair, err := s.helper.GeneratePair(usecaseReq.IdUser)
	http.SetCookie(rw, newRefreshCookie(pair.RefreshToken))

	s.sendJSON(rw, loginResponseDTO{
		IdUser:      usecaseReq.IdUser,
		AccessToken: pair.AccessToken,
	}, http.StatusOK)
}

type refreshFirstDTO struct {
	Email string `json:"email"`
}

type refreshFirstResponseDTO struct {
	IdAuth string `json:"id_auth"`
}

func (s *server) registerFirstHandler(rw http.ResponseWriter, r *http.Request) {
	var req refreshFirstDTO
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		s.handleError(rw, err)
		return
	}

	dto := authentication.RegisterFirstRequestDTO{Email: req.Email}
	resp, err := s.authUsecase.RegisterFirst(r.Context(), dto)
	if err != nil {
		s.handleError(rw, err)
		return
	}

	s.sendJSON(rw, refreshFirstResponseDTO{
		IdAuth: resp.IdAuth,
	}, http.StatusOK)
}

type refreshSecondDTO struct {
	IdAuth    string `json:"id_auth"`
	EmailCode string `json:"email_code"`
}

func (s *server) registerSecondHandler(rw http.ResponseWriter, r *http.Request) {
	var req refreshSecondDTO
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		s.handleError(rw, err)
		return
	}

	dto := authentication.RegisterSecondRequestDTO{
		EmailCode: req.EmailCode,
		IdAuth:    req.IdAuth,
	}

	err = s.authUsecase.RegisterSecond(r.Context(), dto)
	if err != nil {
		s.handleError(rw, err)
		return
	}

	rw.WriteHeader(http.StatusNoContent)
}

type refreshThirdDTO struct {
	IdAuth      string     `json:"id_auth"`
	Password    string     `json:"password"`
	FirstName   string     `json:"first_name"`
	SecondName  string     `json:"second_name"`
	Gender      *string    `json:"gender,omitempty"`
	DateOfBirth *time.Time `json:"date_of_birth,omitempty"`
}

func (s *server) registerThirdHandler(rw http.ResponseWriter, r *http.Request) {
	var req refreshThirdDTO
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		s.handleError(rw, err)
		return
	}

	dto := authentication.RegisterThirdRequestDTO{
		IdAuth:      req.IdAuth,
		Password:    req.Password,
		FirstName:   req.FirstName,
		SecondName:  req.SecondName,
		Gender:      req.Gender,
		DateOfBirth: req.DateOfBirth,
	}

	err = s.authUsecase.RegisterThird(r.Context(), dto)
	if err != nil {
		s.handleError(rw, err)
		return
	}

	rw.WriteHeader(http.StatusNoContent)
}

type refreshResponseDTO struct {
	AccessToken string `json:"access_token"`
}

func (s *server) refreshHandler(rw http.ResponseWriter, r *http.Request) {
	refreshCookie, err := getRefreshCookie(r)
	if err != nil {
		s.handleError(rw, beda.NewWhere("refreshHandler", "getRefreshCookie", err))
		return
	}

	claims, err := s.helper.ParseToken(refreshCookie.Value)
	if err != nil {
		s.handleError(rw, beda.NewWhere("refreshHandler", "ParseToken", err))
		return
	}

	pair, err := s.helper.GeneratePair(claims.UserID)
	if err != nil {
		s.handleError(rw, beda.NewWhere("refreshHandler", "GeneratePair", err))
		return
	}

	http.SetCookie(rw, newRefreshCookie(pair.RefreshToken))
	s.sendJSON(rw, refreshResponseDTO{
		AccessToken: pair.AccessToken,
	}, http.StatusOK)
}

func (s *server) logoutHandler(rw http.ResponseWriter, r *http.Request) {
	http.SetCookie(rw, newRefreshClearCookie())
}

type emailIsUniqueRequestDTO struct {
	Email string `json:"email"`
}

func (s *server) emailIsUniqueHandler(rw http.ResponseWriter, r *http.Request) {
	var req emailIsUniqueRequestDTO
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		s.handleError(rw, err)
		return
	}

	err = s.authUsecase.EmailIsUnique(r.Context(), authentication.EmailIsUniqueRequestDTO{Email: req.Email})
	if err != nil {
		s.handleError(rw, beda.NewWhere("emailIsUniqueHandler", "EmailIsUnique", err))
		return
	}

	rw.WriteHeader(http.StatusNoContent)
}
