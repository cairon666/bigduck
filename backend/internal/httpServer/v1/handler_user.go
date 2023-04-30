package v1

import (
	"encoding/json"
	"net/http"
	"time"

	"backend/internal/domain/usecases/userusecase"
	"github.com/go-chi/chi/v5"
)

// ---------------------------------------------------

func (s *Server) deleteUserByID(rw http.ResponseWriter, r *http.Request) {
	IDUser := chi.URLParam(r, "IDUser")

	if err := shouldEqualIDUserOrAdmin(r, IDUser); err != nil {
		s.handleError(rw, err)
		return
	}

	err := s.userUsecase.DeleteByID(r.Context(), userusecase.DeleteByIDRequest{IDUser: IDUser})
	if err != nil {
		s.handleError(rw, err)
		return
	}

	rw.WriteHeader(http.StatusNoContent)
}

// ---------------------------------------------------

type getUserByIDResponse struct {
	ID          string     `json:"id"`
	Email       string     `json:"email"`
	FirstName   string     `json:"first_name"`
	SecondName  string     `json:"second_name"`
	AvatarURL   *string    `json:"avatar_url,omitempty"`
	DateOfBirth *time.Time `json:"date_of_birth,omitempty"`
	Gender      *string    `json:"gender,omitempty"`
	CreateAt    time.Time  `json:"create_at"`
	ModifyAt    time.Time  `json:"modify_at"`
}

func (s *Server) getUserByID(rw http.ResponseWriter, r *http.Request) {
	IDUser := chi.URLParam(r, "IDUser")

	if err := shouldEqualIDUserOrAdmin(r, IDUser); err != nil {
		s.handleError(rw, err)
		return
	}

	resp, err := s.userUsecase.ReadByID(r.Context(), userusecase.ReadByIDRequest{IDUser: IDUser})
	if err != nil {
		s.handleError(rw, err)
		return
	}

	s.sendJSON(rw, getUserByIDResponse{
		ID:          resp.ID,
		Email:       resp.Email,
		FirstName:   resp.FirstName,
		SecondName:  resp.SecondName,
		AvatarURL:   resp.AvatarURL,
		DateOfBirth: resp.DateOfBirth,
		Gender:      resp.Gender,
		CreateAt:    resp.CreateAt,
		ModifyAt:    resp.ModifyAt,
	}, http.StatusOK)
}

// ---------------------------------------------------

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
		s.handleError(rw, err)
		return
	}

	if err := shouldEqualIDUserOrAdmin(r, IDUser); err != nil {
		s.handleError(rw, err)
		return
	}

	err := s.userUsecase.UpdateByID(r.Context(), userusecase.UpdateByIDRequest{
		IDUser:      IDUser,
		FirstName:   reqDTO.FirstName,
		SecondName:  reqDTO.SecondName,
		Gender:      reqDTO.Gender,
		DateOfBirth: reqDTO.DateOfBirth,
		AvatarURL:   reqDTO.AvatarURL,
	})
	if err != nil {
		s.handleError(rw, err)
		return
	}

	rw.WriteHeader(http.StatusNoContent)
}
