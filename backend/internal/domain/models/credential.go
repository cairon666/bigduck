package models

type Credential struct {
	ID             string
	Email          string
	EmailIsConfirm bool
	PasswordHash   string
	Salt           string
}

func NewCredential(
	id, email string,
	emailIsConfirm bool,
	passwordHash, salt string,
) Credential {
	return Credential{
		ID:             id,
		Email:          email,
		EmailIsConfirm: emailIsConfirm,
		PasswordHash:   passwordHash,
		Salt:           salt,
	}
}
