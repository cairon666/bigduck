package models

import "github.com/google/uuid"

type ConfirmEmailCode struct {
	IDUser uuid.UUID
	Code   string
}

func (m *ConfirmEmailCode) Key() string {
	return ConfirmEmailCodeKey(m.IDUser)
}

func ConfirmEmailCodeKey(idUser uuid.UUID) string {
	return "confirm_email_code" + idUser.String()
}

func NewConfirmEmailCode(code string, idUser uuid.UUID) *ConfirmEmailCode {
	return &ConfirmEmailCode{
		IDUser: idUser,
		Code:   code,
	}
}
