package authusecase

import (
	"crypto/rand"
	"encoding/base64"
	"io"

	"backend/internal/exceptions"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

func hashPassword(password string, salt string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password+salt), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}

	return string(bytes), nil
}

func checkPasswordHash(password, salt, hash string) error {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password+salt))
	if err != nil {
		return exceptions.ErrBadPassword
	}

	return nil
}

func generateSalt() (string, error) {
	salt := make([]byte, bcrypt.DefaultCost)

	_, err := io.ReadFull(rand.Reader, salt)
	if err != nil {
		return "", err
	}

	return base64.StdEncoding.EncodeToString(salt), err
}

func generateUUID() (string, error) {
	genUUID, err := uuid.NewUUID()
	if err != nil {
		return "", err
	}

	return genUUID.String(), nil
}
