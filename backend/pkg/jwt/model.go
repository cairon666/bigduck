package jwt

import (
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"time"
)

const (
	AccessTokenTTL  = time.Hour
	RefreshTokenTTL = time.Hour * 24 * 30
)

type Pair struct {
	AccessToken  string
	RefreshToken string
}

type CustomClaims struct {
	UserID string `json:"user_id"`
	jwt.RegisteredClaims
}

func newClaims(userID string, duration time.Duration) *CustomClaims {
	return &CustomClaims{
		UserID: userID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(duration)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			NotBefore: jwt.NewNumericDate(time.Now()),
			//Issuer:    "test",
			//Subject:   "somebody",
			ID: uuid.New().String(),
			//Audience:  []string{"somebody_else"},
		},
	}
}
