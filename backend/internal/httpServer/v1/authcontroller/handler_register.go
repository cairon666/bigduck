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
	UserName    string     `json:"user_name"`
	Gender      *string    `json:"gender,omitempty"`
	DateOfBirth *time.Time `json:"date_of_birth,omitempty"`
	AvatarURL   *string    `json:"avatar_url,omitempty"`
}

func (c *controller) registerHandler(rw http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	var reqDTO registerRequest
	if err := json.NewDecoder(r.Body).Decode(&reqDTO); err != nil {
		c.httpHelper.HandleError(ctx, rw, err)
		return
	}

	dto, err := authusecase.NewRegisterRequest(
		reqDTO.Email,
		reqDTO.Password,
		reqDTO.FirstName,
		reqDTO.SecondName,
		reqDTO.UserName,
		reqDTO.Gender,
		reqDTO.DateOfBirth,
		reqDTO.AvatarURL,
	)
	if err != nil {
		c.httpHelper.HandleError(ctx, rw, err)
		return
	}

	if err := c.authUsecase.Register(ctx, dto); err != nil {
		c.httpHelper.HandleError(ctx, rw, err)
		return
	}

	rw.WriteHeader(http.StatusOK)
}
