package authusecase

import "time"

// --------------------- Register -----------------

type RegisterRequest struct {
	Email       string
	Password    string
	FirstName   string
	SecondName  string
	Gender      *string
	DateOfBirth *time.Time
	AvatarURL   *string
}

func (dto *RegisterRequest) IsValid() error {
	return nil
}

// ----------------- LOGIN ----------------

type LoginRequest struct {
	Email    string
	Password string
}

func (dto *LoginRequest) IsValid() error {
	return nil
}

type LoginResponse struct {
	IDUser string
}
