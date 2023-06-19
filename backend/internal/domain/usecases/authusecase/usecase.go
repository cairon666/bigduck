package authusecase

import (
	"context"

	"backend/internal/domain/models"
	"go.uber.org/dig"
)

//go:generate mockery --name UserService
type UserService interface {
	Create(ctx context.Context, user models.User) error
}

//go:generate mockery --name CredentialService
type CredentialService interface {
	Create(ctx context.Context, credential models.Credential) error
	ReadByEmail(ctx context.Context, email string) (models.Credential, error)
	ReadByID(ctx context.Context, id string) (models.Credential, error)
	UpdatePasswordByID(ctx context.Context, id, hash, salt string) error
	UpdateEmailByID(ctx context.Context, id string, email string) error
	ConfirmEmailByID(ctx context.Context, id string) error
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
	Get(ctx context.Context, email string) (models.RecoverPassword, error)
	Set(ctx context.Context, email string, data models.RecoverPassword) error
}

//go:generate mockery --name ConfirmEmailCodeService
type ConfirmEmailCodeService interface {
	Get(ctx context.Context, idUser string) (string, error)
	Set(ctx context.Context, idUser, code string) error
}

type Usecase struct {
	userService                UserService
	mailService                MailService
	recoverPasswordCodeService RecoverPasswordCodeService
	credentialService          CredentialService
	confirmEmailCodeService    ConfirmEmailCodeService
}

type Props struct {
	dig.In

	UserService                UserService
	MailService                MailService
	RecoverPasswordCodeService RecoverPasswordCodeService
	CredentialService          CredentialService
	ConfirmEmailCodeService    ConfirmEmailCodeService
}

func NewAuthUsecase(props Props) *Usecase {
	return &Usecase{
		userService:                props.UserService,
		mailService:                props.MailService,
		recoverPasswordCodeService: props.RecoverPasswordCodeService,
		credentialService:          props.CredentialService,
		confirmEmailCodeService:    props.ConfirmEmailCodeService,
	}
}
