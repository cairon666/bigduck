package userusecase

import (
	"context"
	"time"

	"backend/internal/domain/models"
	"backend/pkg/tracing"
	"github.com/google/uuid"
)

type GetByIDRequest struct {
	IDUser uuid.UUID
}

func NewGetByIDRequest(idUser uuid.UUID) GetByIDRequest {
	return GetByIDRequest{
		IDUser: idUser,
	}
}

type GetByIDResponse struct {
	ID          uuid.UUID
	Email       string
	IsConfirm   bool
	UserName    string
	FirstName   string
	SecondName  string
	Gender      *models.Gender
	DateOfBirth *time.Time
	AvatarURL   *string
	CreateAt    time.Time
	Roles       []models.RoleID
}

func (u *Usecase) GetByID(ctx context.Context, req GetByIDRequest) (GetByIDResponse, error) {
	ctx, span := tracing.Start(ctx, "userusecase.GetByID")
	defer span.End()

	user, err := u.userService.ReadOneUserProfileRolesByID(ctx, req.IDUser)
	if err != nil {
		return GetByIDResponse{}, err
	}

	return GetByIDResponse{
		ID:          user.User.ID,
		Email:       user.User.Email,
		IsConfirm:   user.User.IsConfirm,
		UserName:    user.User.UserName,
		FirstName:   user.Profile.FirstName,
		SecondName:  user.Profile.SecondName,
		DateOfBirth: user.Profile.DateOfBirth,
		AvatarURL:   user.Profile.AvatarURL,
		Gender:      user.Profile.Gender,
		CreateAt:    user.Profile.CreateAt,
		Roles:       user.Roles,
	}, nil
}
