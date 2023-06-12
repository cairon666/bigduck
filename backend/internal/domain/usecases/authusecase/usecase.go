package authusecase

import (
	"context"

	"backend/internal/domain/models"
	"go.uber.org/dig"
)

//go:generate mockery --name UserService
type UserService interface {
	ReadByEmail(ctx context.Context, email string) (models.User, error)
	UpdatePasswordByID(ctx context.Context, id, hash, salt string) error
	Create(ctx context.Context, user models.User) error
}

//go:generate mockery --name MailService
type MailService interface {
	SendRecoverPasswordCode(ctx context.Context, data models.RecoverPassword) error
}

//go:generate mockery --name CodeService
type CodeService interface {
	GetCodeByEmail(ctx context.Context, email string) (models.RecoverPassword, error)
	SetCode(ctx context.Context, data models.RecoverPassword) error
}

type Usecase struct {
	userService UserService
	mailService MailService
	codeService CodeService
}

type Props struct {
	dig.In

	UserService UserService
	MailService MailService
	CodeService CodeService
}

func NewAuthUsecase(props Props) *Usecase {
	return &Usecase{
		userService: props.UserService,
		mailService: props.MailService,
		codeService: props.CodeService,
	}
}
