package v1

import (
	"backend/internal/domain/usecases/userUsecase"
	"backend/pkg/beda"
	"github.com/go-chi/chi/v5"
	"net/http"
	"time"
)

type getUserByIdResponse struct {
	Id          string     `json:"id"`
	Email       string     `json:"email"`
	FirstName   string     `json:"first_name"`
	SecondName  string     `json:"second_name"`
	AvatarURL   *string    `json:"avatar_url,omitempty"`
	DateOfBirth *time.Time `json:"date_of_birth,omitempty"`
	Gender      *string    `json:"gender,omitempty"`
	CreateAt    time.Time  `json:"create_at"`
	ModifyAt    time.Time  `json:"modify_at"`
}

func (s *server) getUserById(rw http.ResponseWriter, r *http.Request) {
	IdUser := chi.URLParam(r, "IdUser")

	if err := shouldEqualIdUserOrAdmin(r, IdUser); err != nil {
		s.handleError(rw, beda.Wrap("shouldEqualIdUserOrAdmin", err))
		return
	}

	resp, err := s.userUsecase.ReadById(r.Context(), userUsecase.ReadByIdRequest{IdUser: IdUser})
	if err != nil {
		s.handleError(rw, beda.Wrap("ReadById", err))
		return
	}

	s.sendJSON(rw, getUserByIdResponse{
		Id:          resp.Id,
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
