package userusecase

import (
	"context"
	"time"

	"backend/internal/domain/aggregate"
	"backend/internal/domain/models"
	"github.com/google/uuid"
	"go.uber.org/dig"
)

//go:generate mockery --name UserService
type UserService interface {
	ReadOneUserByID(ctx context.Context, id uuid.UUID) (models.User, error)
	ReadOneUserCredentialByID(ctx context.Context, id uuid.UUID) (aggregate.UserCredential, error)
	ReadOneUserProfileRolesByID(ctx context.Context, id uuid.UUID) (aggregate.UserProfileRoles, error)
	UpdateEmailByID(ctx context.Context, id uuid.UUID, email string) error
	UpdatePasswordByID(ctx context.Context, id uuid.UUID, hash string, salt string) error
	ConfirmEmailByID(ctx context.Context, id uuid.UUID) error
}

//go:generate mockery --name MailService
type MailService interface {
	SendEmailConfirmCode(ctx context.Context, email, code string)
}

//go:generate mockery --name ConfirmEmailCodeService
type ConfirmEmailCodeService interface {
	Get(ctx context.Context, key string) (*models.ConfirmEmailCode, error)
	Set(ctx context.Context, data *models.ConfirmEmailCode, ttl time.Duration) error
}

type Usecase struct {
	userService             UserService
	mailService             MailService
	confirmEmailCodeService ConfirmEmailCodeService
}

type Props struct {
	dig.In

	UserService             UserService
	MailService             MailService
	ConfirmEmailCodeService ConfirmEmailCodeService
}

func NewUsecase(props Props) *Usecase {
	return &Usecase{
		userService:             props.UserService,
		mailService:             props.MailService,
		confirmEmailCodeService: props.ConfirmEmailCodeService,
	}
}
