package authentication

import (
	"authService/internal/domain/exceptions"
	"authService/internal/domain/models"
	"authService/pkg/beda"
	"context"
	"errors"
	"github.com/google/uuid"
	"time"
)

type AuthUsecase interface {
	Login(ctx context.Context, dto LoginRequestDTO) (LoginResponseDTO, error)
	RegisterFirst(ctx context.Context, dto RegisterFirstRequestDTO) (RegisterFirstResponseDTO, error)
	RegisterSecond(ctx context.Context, dto RegisterSecondRequestDTO) error
	RegisterThird(ctx context.Context, dto RegisterThirdRequestDTO) error
	EmailIsUnique(ctx context.Context, dto EmailIsUniqueRequestDTO) error
}

type UserService interface {
	GetById(ctx context.Context, id string) (models.User, error)
	GetByEmail(ctx context.Context, email string) (models.User, error)
	Create(ctx context.Context, user models.User) error
}

type RegisterService interface {
	CreateSession(ctx context.Context, data models.Register) (IdSession string, error error)
	GetSession(ctx context.Context, IdSession string) (data models.Register, err error)
	SetSession(ctx context.Context, IdSession string, data models.Register) error
	DeleteSession(ctx context.Context, IdSession string) error
}

type authenticationUsecase struct {
	userService     UserService
	registerService RegisterService
}

func NewAuthUsecase(
	userService UserService,
	registerService RegisterService,
) AuthUsecase {
	return &authenticationUsecase{
		userService:     userService,
		registerService: registerService,
	}
}

func (usecase *authenticationUsecase) Login(ctx context.Context, dto LoginRequestDTO) (LoginResponseDTO, error) {
	err := dto.IsValid()
	if err != nil {
		return LoginResponseDTO{}, beda.New(exceptions.ErrorValidation, err)
	}

	user, err := usecase.userService.GetByEmail(ctx, dto.Email)
	if err != nil {
		return LoginResponseDTO{}, beda.NewWhere("Login", "GetByEmail", err)
	}

	err = checkPasswordHash(dto.Password, user.Salt, user.PasswordHash)
	if err != nil {
		return LoginResponseDTO{}, beda.New(exceptions.ErrorBadPassword, err)
	}

	return LoginResponseDTO{
		IdUser: user.IdUser,
	}, nil
}

func (usecase *authenticationUsecase) RegisterFirst(ctx context.Context, dto RegisterFirstRequestDTO) (RegisterFirstResponseDTO, error) {
	err := dto.IsValid()
	if err != nil {
		return RegisterFirstResponseDTO{}, beda.New(exceptions.ErrorValidation, err)
	}

	code, err := generateEmailCode()
	if err != nil {
		return RegisterFirstResponseDTO{}, beda.NewWhere("RegisterFirst", "generateEmailCode", err)
	}

	regUnit := models.Register{
		Email:     dto.Email,
		EmailCode: code,
		IsConfirm: false,
	}
	idAuth, err := usecase.registerService.CreateSession(ctx, regUnit)
	if err != nil {
		return RegisterFirstResponseDTO{}, beda.NewWhere("RegisterFirst", "CreateSession", err)
	}

	return RegisterFirstResponseDTO{
		IdAuth: idAuth,
	}, nil
}

func (usecase *authenticationUsecase) RegisterSecond(ctx context.Context, dto RegisterSecondRequestDTO) error {
	err := dto.IsValid()
	if err != nil {
		return beda.New(exceptions.ErrorValidation, err)
	}

	unit, err := usecase.registerService.GetSession(ctx, dto.IdAuth)
	if err != nil {
		return beda.NewWhere("RegisterSecond", "GetSession", err)
	}

	if unit.EmailCode != dto.EmailCode {
		return errors.New("bad email code")
	}

	unit.IsConfirm = true
	err = usecase.registerService.SetSession(context.TODO(), dto.IdAuth, unit)
	if err != nil {
		return beda.NewWhere("RegisterSecond", "SetSession", err)
	}

	return nil
}

func (usecase *authenticationUsecase) RegisterThird(ctx context.Context, dto RegisterThirdRequestDTO) error {
	err := dto.IsValid()
	if err != nil {
		return beda.New(exceptions.ErrorValidation, err)
	}

	unit, err := usecase.registerService.GetSession(ctx, dto.IdAuth)
	if err != nil {
		return beda.NewWhere("RegisterThird", "GetSession", err)
	}
	if !unit.IsConfirm {
		return beda.New(exceptions.ErrorEmailNotConfirm, err)
	}

	genUuid, err := uuid.NewUUID()
	if err != nil {
		return beda.NewWhere("RegisterThird", "NewUUID", err)
	}
	salt, err := generateSalt()
	if err != nil {
		return beda.NewWhere("RegisterThird", "generateSalt", err)
	}
	hash, err := hashPassword(dto.Password, salt)
	if err != nil {
		return beda.NewWhere("RegisterThird", "hashPassword", err)
	}

	user := models.User{
		IdUser:       genUuid.String(),
		Email:        unit.Email,
		PasswordHash: hash,
		Salt:         salt,
		FirstName:    dto.FirstName,
		SecondName:   dto.SecondName,
		DateOfBirth:  dto.DateOfBirth,
		Gender:       dto.Gender,
		DateCreate:   time.Now(),
		DateModify:   time.Now(),
	}

	err = usecase.userService.Create(ctx, user)
	if err != nil {
		return beda.NewWhere("RegisterThird", "Create", err)
	}

	return nil
}

func (usecase *authenticationUsecase) EmailIsUnique(ctx context.Context, dto EmailIsUniqueRequestDTO) error {
	err := dto.IsValid()
	if err != nil {
		return beda.New(exceptions.ErrorValidation, err)
	}

	_, err = usecase.userService.GetByEmail(ctx, dto.Email)
	if err == nil {
		return beda.New(exceptions.ErrorEmailAlreadyExist, nil)
	}

	bedaErr, ok := err.(beda.Beda)
	if !ok {
		return beda.NewWhere("EmailIsUnique", "GetByEmail", err)
	}

	if bedaErr.Message() == exceptions.ErrorNotFound {
		return nil
	} else {
		return beda.New(exceptions.ErrorEmailAlreadyExist, nil)
	}
}
