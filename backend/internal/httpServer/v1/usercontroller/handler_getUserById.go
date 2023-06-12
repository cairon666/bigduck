package usercontroller

import (
	"net/http"
	"time"

	"backend/internal/domain/usecases/userusecase"
	"github.com/go-chi/chi/v5"
)

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

func (c *controller) getUserByID(rw http.ResponseWriter, r *http.Request) {
	IDUser := chi.URLParam(r, "IDUser")

	if !c.authHelper.IsEqualIDUser(r, IDUser) {
		rw.WriteHeader(http.StatusForbidden)
		return
	}

	resp, err := c.userUsecase.ReadByID(r.Context(), userusecase.ReadByIDRequest{IDUser: IDUser})
	if err != nil {
		c.httpHelper.HandleError(rw, err)
		return
	}

	c.httpHelper.SendJSON(rw, getUserByIDResponse{
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
