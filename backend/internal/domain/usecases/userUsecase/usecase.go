package userUsecase

import (
	"backend/internal/domain/models"
	"backend/pkg/beda"
	"context"
	"time"
)

//go:generate mockery --name UserService
type UserService interface {
	ReadById(ctx context.Context, id string) (models.User, error)
	UpdateById(ctx context.Context, id string, data map[string]any) error
	DeleteById(ctx context.Context, id string) error
}

type userUsecase struct {
	userService UserService
}

func NewUserUsecase(userService UserService) *userUsecase {
	return &userUsecase{
		userService: userService,
	}
}

func (u *userUsecase) ReadById(ctx context.Context, dto ReadByIdRequest) (ReadByIdResponse, error) {
	if err := dto.IsValid(); err != nil {
		return ReadByIdResponse{}, err
	}

	user, err := u.userService.ReadById(ctx, dto.IdUser)
	if err != nil {
		return ReadByIdResponse{}, beda.Wrap("ReadById.Read", err)
	}

	var gender *string
	if user.Gender != nil {
		tmp := string(*user.Gender)
		gender = &tmp
	}

	return ReadByIdResponse{
		Id:          user.Id,
		Email:       user.Email,
		FirstName:   user.FirstName,
		SecondName:  user.SecondName,
		Gender:      gender,
		DateOfBirth: user.DateOfBirth,
		AvatarURL:   user.AvatarURL,
		CreateAt:    user.CreateAt,
		ModifyAt:    user.ModifyAt,
	}, nil
}

func (u *userUsecase) UpdateById(ctx context.Context, dto UpdateByIdRequest) error {
	if err := dto.IsValid(); err != nil {
		return err
	}

	if err := u.userService.UpdateById(ctx, dto.IdUser, map[string]any{
		"modify_at":     time.Now(),
		"first_name":    dto.FirstName,
		"second_name":   dto.SecondName,
		"gender":        dto.Gender,
		"date_of_birth": dto.DateOfBirth,
		"avatar_url":    dto.AvatarURL,
	}); err != nil {
		return beda.Wrap("UpdateById.Update", err)
	}

	return nil
}

func (u *userUsecase) DeleteById(ctx context.Context, dto DeleteByIdRequest) error {
	if err := dto.IsValid(); err != nil {
		return err
	}

	if err := u.userService.DeleteById(ctx, dto.IdUser); err != nil {
		return beda.Wrap("DeleteById.Delete", err)
	}

	return nil
}
