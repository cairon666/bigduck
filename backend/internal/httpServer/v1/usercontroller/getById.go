package usercontroller

import (
	"net/http"
	"time"

	"backend/internal/domain/models"
	"backend/internal/domain/usecases/userusecase"
	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
)

type getByIDHandlerResponse struct {
	ID          uuid.UUID       `json:"id"`
	Email       string          `json:"email"`
	IsConfirm   bool            `json:"is_confirm"`
	UserName    string          `json:"user_name"`
	FirstName   string          `json:"first_name"`
	SecondName  string          `json:"second_name"`
	DateOfBirth *time.Time      `json:"date_of_birth"`
	AvatarURL   *string         `json:"avatar_url"`
	Gender      *models.Gender  `json:"gender"`
	CreateAt    time.Time       `json:"create_at"`
	Roles       []models.RoleID `json:"roles"`
}

func (c *Controller) getByIDHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	idUser, _ := uuid.Parse(chi.URLParam(r, "IDUser"))

	if err := c.authHelper.IsEqualOrAdmin(r, idUser); err != nil {
		c.httpHelper.HandleError(ctx, w, err)
		return
	}

	dto := userusecase.NewGetByIDRequest(idUser)

	resp, err := c.userUsecase.GetByID(ctx, dto)
	if err != nil {
		c.httpHelper.HandleError(ctx, w, err)
		return
	}

	c.httpHelper.SendJSON(w, getByIDHandlerResponse{
		ID:          resp.ID,
		Email:       resp.Email,
		IsConfirm:   resp.IsConfirm,
		FirstName:   resp.FirstName,
		SecondName:  resp.SecondName,
		UserName:    resp.UserName,
		DateOfBirth: resp.DateOfBirth,
		AvatarURL:   resp.AvatarURL,
		Gender:      resp.Gender,
		CreateAt:    resp.CreateAt,
		Roles:       resp.Roles,
	}, http.StatusOK)
}
