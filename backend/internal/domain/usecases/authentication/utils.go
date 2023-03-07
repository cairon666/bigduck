package authentication

import (
	"authService/pkg/beda"
	"crypto/rand"
	"encoding/base64"
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
		return beda.NewWhere("checkPasswordHash", "CompareHashAndPassword", err)
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
