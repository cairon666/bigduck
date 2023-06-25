package models

type RecoverPassword struct {
	Email     string `json:"email"`
	ID        string `json:"id"`
	IsConfirm bool   `json:"is_confirm"`
	Code      string `json:"code"`
}

func (rp *RecoverPassword) Key() string {
	return RecoverPasswordKey(rp.Email)
}

func RecoverPasswordKey(email string) string {
	return "recover_password:" + email
}

func NewRecoverPassword(
	email string,
	id string,
	isConfirm bool,
	code string,
) *RecoverPassword {
	return &RecoverPassword{
		Email:     email,
		ID:        id,
		IsConfirm: isConfirm,
		Code:      code,
	}
}
