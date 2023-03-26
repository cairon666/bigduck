package authUsecase

import (
	"backend/internal/exceptions"
	"crypto/rand"
	"encoding/base64"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"io"
	"log"
)

func hashPassword(password string, salt string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password+salt), bcrypt.DefaultCost)

	return string(bytes), err
}

func checkPasswordHash(password, salt, hash string) error {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password+salt))
	if err != nil {
		return exceptions.ErrorBadPassword
	}
	return nil
}

func generateEmailCode() (string, error) {
	return "0000", nil
}

func generateSalt() (string, error) {
	salt := make([]byte, 12)
	_, err := io.ReadFull(rand.Reader, salt)
	if err != nil {
		log.Fatal(err)
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
