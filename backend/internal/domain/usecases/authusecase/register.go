package authusecase

import (
	"context"
	"time"

	"backend/internal/domain/aggregate"
	"backend/internal/domain/models"
	"backend/internal/security"
	"backend/pkg/tracing"
	"github.com/google/uuid"
)

type RegisterRequest struct {
	Email       string
	Password    string
	FirstName   string
	SecondName  string
	UserName    string
	Gender      *models.Gender
	DateOfBirth *time.Time
	AvatarURL   *string
}

func NewRegisterRequest(
	email, password, firstName, secondName, userName string,
	gender *string,
	dateOfBirth *time.Time,
	avatarURL *string,
) RegisterRequest {
	return RegisterRequest{
		Email:       email,
		Password:    password,
		FirstName:   firstName,
		SecondName:  secondName,
		UserName:    userName,
		Gender:      models.MustParsePointGender(gender),
		DateOfBirth: dateOfBirth,
		AvatarURL:   avatarURL,
	}
}

func (u *Usecase) Register(ctx context.Context, dto RegisterRequest) error {
	ctx, span := tracing.Start(ctx, "authusecase.Register")
	defer span.End()

	userUUID, err := uuid.NewUUID()
	if err != nil {
		return err
	}

	hash, salt, err := security.GenerateHashPassword(dto.Password)
	if err != nil {
		return err
	}

	userFull := aggregate.NewUserFull(
		models.NewUser(
			userUUID,
			false,
			dto.Email,
			dto.UserName,
		),
		models.NewProfile(
			userUUID,
			dto.FirstName,
			dto.SecondName,
			dto.Gender,
			dto.DateOfBirth,
			dto.AvatarURL,
			time.Now(),
		),
		models.NewCredential(
			userUUID,
			hash,
			salt,
		),
		models.Roles{models.RoleIDUser},
	)

	err = u.userService.Create(ctx, userFull)
	if err != nil {
		return err
	}

	return nil
}
