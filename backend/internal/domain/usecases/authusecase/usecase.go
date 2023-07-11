package authusecase

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
	Create(ctx context.Context, user aggregate.UserFull) error
	ReadOneUserFullByEmail(ctx context.Context, email string) (aggregate.UserFull, error)
	ReadOneUserByID(ctx context.Context, id uuid.UUID) (models.User, error)
	ReadOneUserByEmail(ctx context.Context, email string) (models.User, error)
	ReadOneUserByUsername(ctx context.Context, username string) (models.User, error)
	ReadOneUserCredentialByID(ctx context.Context, id uuid.UUID) (aggregate.UserCredential, error)
	ReadOneUserCredentialByEmail(ctx context.Context, email string) (aggregate.UserCredential, error)
	ReadOneUserCredentialByUsername(ctx context.Context, un string) (aggregate.UserCredential, error)
	UpdateEmailByID(ctx context.Context, id uuid.UUID, email string) error
	UpdatePasswordByID(ctx context.Context, id uuid.UUID, hash string, salt string) error
	ConfirmEmailByID(ctx context.Context, id uuid.UUID) error
}

//go:generate mockery --name MailService
type MailService interface {
	SendRecoverPasswordCode(ctx context.Context, email, code string)
	SendSomebodyLogin(ctx context.Context, email string)
	SendSomebodyTryLogin(ctx context.Context, email string)
	SendPasswordWasUpdate(ctx context.Context, email string)
	SendEmailWasUpdate(ctx context.Context, email string)
	SendEmailConfirmCode(ctx context.Context, email, code string)
}

//go:generate mockery --name RecoverPasswordCodeService
type RecoverPasswordCodeService interface {
	Get(ctx context.Context, key string) (*models.RecoverPassword, error)
	Set(ctx context.Context, data *models.RecoverPassword, ttl time.Duration) error
}

//go:generate mockery --name ConfirmEmailCodeService
type ConfirmEmailCodeService interface {
	Get(ctx context.Context, key string) (*models.ConfirmEmailCode, error)
	Set(ctx context.Context, data *models.ConfirmEmailCode, ttl time.Duration) error
}

type Usecase struct {
	userService                UserService
	mailService                MailService
	recoverPasswordCodeService RecoverPasswordCodeService
	confirmEmailCodeService    ConfirmEmailCodeService
}

type Props struct {
	dig.In

	UserService                UserService
	MailService                MailService
	RecoverPasswordCodeService RecoverPasswordCodeService
	ConfirmEmailCodeService    ConfirmEmailCodeService
}

func NewAuthUsecase(props Props) *Usecase {
	return &Usecase{
		userService:                props.UserService,
		mailService:                props.MailService,
		recoverPasswordCodeService: props.RecoverPasswordCodeService,
		confirmEmailCodeService:    props.ConfirmEmailCodeService,
	}
}
