package userusecase

import (
	"context"
	"time"

	"backend/internal/domain/models"
	"backend/pkg/beda"
)

//go:generate mockery --name=UserService --outpkg=userusecase_test
type UserService interface {
	ReadByID(ctx context.Context, id string) (models.User, error)
	UpdateByID(ctx context.Context, id string, data map[string]any) error
	DeleteByID(ctx context.Context, id string) error
}

type UserUsecase struct {
	userService UserService
}

func NewUserUsecase(userService UserService) *UserUsecase {
	return &UserUsecase{
		userService: userService,
	}
}

func (u *UserUsecase) ReadByID(ctx context.Context, dto ReadByIDRequest) (ReadByIDResponse, error) {
	if err := dto.IsValid(); err != nil {
		return ReadByIDResponse{}, err
	}

	user, err := u.userService.ReadByID(ctx, dto.IDUser)
	if err != nil {
		return ReadByIDResponse{}, beda.Wrap("Read", err)
	}

	resp := ReadByIDResponse{
		ID:          user.ID,
		Email:       user.Email,
		FirstName:   user.FirstName,
		SecondName:  user.SecondName,
		Gender:      nil,
		DateOfBirth: user.DateOfBirth,
		AvatarURL:   user.AvatarURL,
		CreateAt:    user.CreateAt,
		ModifyAt:    user.ModifyAt,
	}

	if user.Gender != nil {
		tmp := user.Gender.ToString()
		resp.Gender = &tmp
	}

	return resp, nil
}

func (u *UserUsecase) UpdateByID(ctx context.Context, dto UpdateByIDRequest) error {
	if err := dto.IsValid(); err != nil {
		return err
	}

	if err := u.userService.UpdateByID(ctx, dto.IDUser, map[string]any{
		"modify_at":     time.Now(),
		"first_name":    dto.FirstName,
		"second_name":   dto.SecondName,
		"gender":        dto.Gender,
		"date_of_birth": dto.DateOfBirth,
		"avatar_url":    dto.AvatarURL,
	}); err != nil {
		return beda.Wrap("UpdateByID.Update", err)
	}

	return nil
}

func (u *UserUsecase) DeleteByID(ctx context.Context, dto DeleteByIDRequest) error {
	if err := dto.IsValid(); err != nil {
		return err
	}

	if err := u.userService.DeleteByID(ctx, dto.IDUser); err != nil {
		return beda.Wrap("DeleteByID.Delete", err)
	}

	return nil
}
