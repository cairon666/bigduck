package usercontroller

import (
	"encoding/json"
	"net/http"
	"time"

	"backend/internal/domain/usecases/userusecase"
	"github.com/go-chi/chi/v5"
)

type updateUserByIDRequest struct {
	FirstName   string     `json:"first_name"`
	SecondName  string     `json:"second_name"`
	Gender      *string    `json:"gender"`
	DateOfBirth *time.Time `json:"date_of_birth"`
	AvatarURL   *string    `json:"avatar_url"`
}

func (c *controller) updateUserByID(rw http.ResponseWriter, r *http.Request) {
	IDUser := chi.URLParam(r, "IDUser")

	var reqDTO updateUserByIDRequest
	if err := json.NewDecoder(r.Body).Decode(&reqDTO); err != nil {
		c.httpHelper.HandleError(rw, err)
		return
	}

	if !c.authHelper.IsEqualIDUser(r, IDUser) {
		rw.WriteHeader(http.StatusForbidden)
		return
	}

	err := c.userUsecase.UpdateByID(r.Context(), userusecase.UpdateByIDRequest{
		IDUser:      IDUser,
		FirstName:   reqDTO.FirstName,
		SecondName:  reqDTO.SecondName,
		Gender:      reqDTO.Gender,
		DateOfBirth: reqDTO.DateOfBirth,
		AvatarURL:   reqDTO.AvatarURL,
	})
	if err != nil {
		c.httpHelper.HandleError(rw, err)
		return
	}

	rw.WriteHeader(http.StatusOK)
}
