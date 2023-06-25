package models

type ConfirmEmailCode struct {
	IDUser string
	Code   string
}

func (m *ConfirmEmailCode) Key() string {
	return ConfirmEmailCodeKey(m.IDUser)
}

func ConfirmEmailCodeKey(idUser string) string {
	return "confirm_email_code" + idUser
}

func NewConfirmEmailCode(code, idUser string) *ConfirmEmailCode {
	return &ConfirmEmailCode{
		IDUser: idUser,
		Code:   code,
	}
}
