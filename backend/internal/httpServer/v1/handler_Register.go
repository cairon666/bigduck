package v1

import (
	"encoding/json"
	"net/http"
	"time"

	"backend/internal/domain/usecases/authusecase"
	"backend/pkg/beda"
)

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
		s.handleError(rw, beda.Wrap("Decode", err))

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
		s.handleError(rw, beda.Wrap("Register", err))
		return
	}

	s.sendJSON(rw, registerResponse{}, http.StatusOK)
}
