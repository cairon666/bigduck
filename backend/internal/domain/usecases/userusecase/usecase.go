package userusecase

import (
	"context"

	"backend/internal/domain/aggregate"
	"github.com/google/uuid"
	"go.uber.org/dig"
)

//go:generate mockery --name UserService
type UserService interface {
	ReadOneUserProfileRolesByID(ctx context.Context, id uuid.UUID) (aggregate.UserProfileRoles, error)
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
