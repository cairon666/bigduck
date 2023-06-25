package userusecase

import (
	"context"
	"time"

	"backend/internal/domain/models"
	"backend/internal/domain/validate"
	"backend/pkg/tracing"
)

type GetByIDRequest struct {
	IDUser string
}

func NewGetByIDRequest(idUser string) (GetByIDRequest, error) {
	if err := validate.Test(
		validate.UUIDSimple(idUser),
	); err != nil {
		return GetByIDRequest{}, err
	}

	return GetByIDRequest{
		IDUser: idUser,
	}, nil
}

type GetByIDResponse struct {
	ID             string
	Email          string
	EmailIsConfirm bool
	FirstName      string
	SecondName     string
	UserName       string
	DateOfBirth    *time.Time
	AvatarURL      *string
	Gender         *models.Gender
	CreateAt       time.Time
}

func (u *Usecase) GetByID(ctx context.Context, req GetByIDRequest) (GetByIDResponse, error) {
	ctx, span := tracing.Start(ctx, "userusecase.GetById")
	defer span.End()

	user, err := u.userService.ReadByID(ctx, req.IDUser)
	if err != nil {
		return GetByIDResponse{}, err
	}

	return GetByIDResponse{
		ID:             user.ID,
		Email:          user.Email,
		EmailIsConfirm: user.EmailIsConfirm,
		FirstName:      user.FirstName,
		SecondName:     user.SecondName,
		UserName:       user.UserName,
		DateOfBirth:    user.DateOfBirth,
		AvatarURL:      user.AvatarURL,
		Gender:         user.Gender,
		CreateAt:       user.CreateAt,
	}, nil
}
