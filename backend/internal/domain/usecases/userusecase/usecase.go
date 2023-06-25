package userusecase

import (
	"context"

	"backend/internal/domain/models"
	"go.uber.org/dig"
)

//go:generate mockery --name UserService
type UserService interface {
	ReadByID(ctx context.Context, id string) (models.User, error)
}

type Usecase struct {
	userService UserService
}

type Props struct {
	dig.In

	UserService UserService
}

func NewUsecase(props Props) *Usecase {
	return &Usecase{
		userService: props.UserService,
	}
}
