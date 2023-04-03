package v1

import (
	"encoding/json"
	"net/http"
	"time"

	"backend/internal/domain/usecases/userusecase"
	"backend/pkg/beda"
	"github.com/go-chi/chi/v5"
)

type updateUserByIDRequest struct {
	FirstName   string     `json:"first_name"`
	SecondName  string     `json:"second_name"`
	Gender      *string    `json:"gender"`
	DateOfBirth *time.Time `json:"date_of_birth"`
	AvatarURL   *string    `json:"avatar_url"`
}

func (s *Server) updateUserByID(rw http.ResponseWriter, r *http.Request) {
	IDUser := chi.URLParam(r, "IDUser")

	var reqDTO updateUserByIDRequest
	if err := json.NewDecoder(r.Body).Decode(&reqDTO); err != nil {
		s.handleError(rw, beda.Wrap("Decode", err))

		return
	}

	if err := shouldEqualIDUserOrAdmin(r, IDUser); err != nil {
		s.handleError(rw, beda.Wrap("shouldEqualIDUserOrAdmin", err))

		return
	}

	err := s.userUsecase.UpdateById(r.Context(), userusecase.UpdateByIDRequest{
		IDUser:      IDUser,
		FirstName:   reqDTO.FirstName,
		SecondName:  reqDTO.SecondName,
		Gender:      reqDTO.Gender,
		DateOfBirth: reqDTO.DateOfBirth,
		AvatarURL:   reqDTO.AvatarURL,
	})
	if err != nil {
		s.handleError(rw, beda.Wrap("UpdateByID", err))

		return
	}

	rw.WriteHeader(http.StatusNoContent)
}
