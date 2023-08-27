package models

import "github.com/google/uuid"

type Credential struct {
	IDUser       uuid.UUID
	PasswordHash string
	Salt         string
}

func NewCredential(idUser uuid.UUID, passwordHash, salt string) Credential {
	return Credential{
		IDUser:       idUser,
		PasswordHash: passwordHash,
		Salt:         salt,
	}
}
