package usercontroller

import (
	"net/http"
	"time"

	"backend/internal/domain/models"
	"backend/internal/domain/usecases/userusecase"
	"github.com/go-chi/chi/v5"
)

type getByIDHandlerResponse struct {
	ID             string         `json:"id"`
	Email          string         `json:"email"`
	EmailIsConfirm bool           `json:"email_is_confirm"`
	FirstName      string         `json:"first_name"`
	SecondName     string         `json:"second_name"`
	UserName       string         `json:"user_name"`
	DateOfBirth    *time.Time     `json:"date_of_birth"`
	AvatarURL      *string        `json:"avatar_url"`
	Gender         *models.Gender `json:"gender"`
	CreateAt       time.Time      `json:"create_at"`
}

func (c *controller) getByIDHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	idUser := chi.URLParam(r, "IDUser")

	if err := c.authHelper.IsEqualIDUser(r, idUser); err != nil {
		c.httpHelper.HandleError(ctx, w, err)
		return
	}

	dto, err := userusecase.NewGetByIDRequest(idUser)
	if err != nil {
		c.httpHelper.HandleError(ctx, w, err)
		return
	}

	resp, err := c.userUsecase.GetByID(ctx, dto)
	if err != nil {
		c.httpHelper.HandleError(ctx, w, err)
		return
	}

	c.httpHelper.SendJSON(w, getByIDHandlerResponse{
		ID:             resp.ID,
		Email:          resp.Email,
		EmailIsConfirm: resp.EmailIsConfirm,
		FirstName:      resp.FirstName,
		SecondName:     resp.SecondName,
		UserName:       resp.UserName,
		DateOfBirth:    resp.DateOfBirth,
		AvatarURL:      resp.AvatarURL,
		Gender:         resp.Gender,
		CreateAt:       resp.CreateAt,
	}, http.StatusOK)
}
