package userusecase

import (
	"context"

	"backend/internal/domain/models"
	"go.uber.org/dig"
)

//go:generate mockery --name=UserService
type UserService interface {
	ReadByID(ctx context.Context, id string) (models.User, error)
	UpdateByID(ctx context.Context, id string, data map[string]any) error
	DeleteByID(ctx context.Context, id string) error
}

type Usecase struct {
	userService UserService
}

type Props struct {
	dig.In

	UserService UserService
}

func NewUserUsecase(props Props) *Usecase {
	return &Usecase{
		userService: props.UserService,
	}
}
