package security

import (
	"crypto/rand"
	"encoding/base64"
	"io"

	"backend/internal/exceptions"

	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string, salt string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password+salt), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}

	return string(bytes), nil
}

func CheckPasswordHash(password, salt, hash string) error {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password+salt))
	if err != nil {
		return exceptions.ErrBadPassword
	}

	return nil
}

func GenerateSalt() (string, error) {
	salt := make([]byte, bcrypt.DefaultCost)

	_, err := io.ReadFull(rand.Reader, salt)
	if err != nil {
		return "", err
	}

	return base64.StdEncoding.EncodeToString(salt), err
}

func GenerateHashPassword(password string) (string, string, error) {
	salt, err := GenerateSalt()
	if err != nil {
		return "", "", err
	}

	hash, err := HashPassword(password, salt)
	if err != nil {
		return "", "", err
	}

	return hash, salt, nil
}
