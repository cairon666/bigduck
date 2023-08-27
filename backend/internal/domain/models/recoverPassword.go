package models

import "github.com/google/uuid"

type RecoverPassword struct {
	ID        uuid.UUID
	Email     string
	IsConfirm bool
	Code      string
}

func (rp *RecoverPassword) Key() string {
	return RecoverPasswordKey(rp.Email)
}

func RecoverPasswordKey(email string) string {
	return "recover_password:" + email
}

func NewRecoverPassword(id uuid.UUID, email string, isConfirm bool, code string) RecoverPassword {
	return RecoverPassword{
		Email:     email,
		ID:        id,
		IsConfirm: isConfirm,
		Code:      code,
	}
}
