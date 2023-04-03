package v1

import (
	"backend/internal/domain/usecases/userUsecase"
	"backend/pkg/beda"
	"encoding/json"
	"github.com/go-chi/chi/v5"
	"net/http"
	"time"
)

type updateUserByIdRequest struct {
	FirstName   string     `json:"first_name"`
	SecondName  string     `json:"second_name"`
	Gender      *string    `json:"gender"`
	DateOfBirth *time.Time `json:"date_of_birth"`
	AvatarURL   *string    `json:"avatar_url"`
}

func (s *server) updateUserById(rw http.ResponseWriter, r *http.Request) {
	IdUser := chi.URLParam(r, "IdUser")

	var reqDTO updateUserByIdRequest
	if err := json.NewDecoder(r.Body).Decode(&reqDTO); err != nil {
		s.handleError(rw, beda.Wrap("Decode", err))
		return
	}

	if err := shouldEqualIdUserOrAdmin(r, IdUser); err != nil {
		s.handleError(rw, beda.Wrap("shouldEqualIdUserOrAdmin", err))
		return
	}

	err := s.userUsecase.UpdateById(r.Context(), userUsecase.UpdateByIdRequest{
		IdUser:      IdUser,
		FirstName:   reqDTO.FirstName,
		SecondName:  reqDTO.SecondName,
		Gender:      reqDTO.Gender,
		DateOfBirth: reqDTO.DateOfBirth,
		AvatarURL:   reqDTO.AvatarURL,
	})
	if err != nil {
		s.handleError(rw, beda.Wrap("UpdateById", err))
		return
	}

	rw.WriteHeader(http.StatusNoContent)
}
