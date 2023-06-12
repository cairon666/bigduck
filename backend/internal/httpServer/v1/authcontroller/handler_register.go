package authcontroller

import (
	"encoding/json"
	"net/http"
	"time"

	"backend/internal/domain/usecases/authusecase"
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

func (c *controller) registerHandler(rw http.ResponseWriter, req *http.Request) {
	var reqDTO registerRequest
	if err := json.NewDecoder(req.Body).Decode(&reqDTO); err != nil {
		c.httpHelper.HandleError(rw, err)
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

	if err := c.authUsecase.Register(req.Context(), dto); err != nil {
		c.httpHelper.HandleError(rw, err)
		return
	}

	rw.WriteHeader(http.StatusNoContent)
}
