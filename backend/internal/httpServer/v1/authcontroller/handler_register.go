package authcontroller

import (
	"encoding/json"
	"net/http"
	"time"

	"backend/internal/domain/usecases/authusecase"
	"backend/internal/exceptions/validate"
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

func (req *registerRequest) IsValid() error {
	return validate.NewValidateError().
		AddField("email", validate.TestEmail(req.Email)).
		AddField("password", validate.TestPassword(req.Password)).
		AddField("first_name", validate.TestName(req.FirstName)).
		AddField("second_name", validate.TestName(req.SecondName)).
		AddField("user_name", validate.TestUsername(req.UserName)).
		AddField("gender", validate.TestPointer(req.Gender, validate.TestGender)).
		AddField("date_of_birth", validate.TestPointer(req.DateOfBirth, validate.TestDayOfBirth)).
		AddField("avatar_url", validate.TestPointer(req.AvatarURL, validate.TestURL)).
		ToError()
}

func (c *Controller) registerHandler(rw http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	var reqDTO registerRequest
	if err := json.NewDecoder(r.Body).Decode(&reqDTO); err != nil {
		c.httpHelper.HandleError(ctx, rw, err)
		return
	}

	if err := reqDTO.IsValid(); err != nil {
		c.httpHelper.HandleError(ctx, rw, err)
		return
	}

	dto := authusecase.NewRegisterRequest(
		reqDTO.Email,
		reqDTO.Password,
		reqDTO.FirstName,
		reqDTO.SecondName,
		reqDTO.UserName,
		reqDTO.Gender,
		reqDTO.DateOfBirth,
		reqDTO.AvatarURL,
	)

	if err := c.authUsecase.Register(ctx, dto); err != nil {
		c.httpHelper.HandleError(ctx, rw, err)
		return
	}

	rw.WriteHeader(http.StatusOK)
}
