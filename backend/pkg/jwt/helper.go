package jwt

import (
	"errors"
	"github.com/golang-jwt/jwt/v5"
)

type Helper struct {
	secret []byte
}

func NewHelper(secret string) Helper {
	return Helper{
		secret: []byte(secret),
	}
}

func (h *Helper) ParseToken(tokenIn string) (*CustomClaims, error) {
	token, err := jwt.ParseWithClaims(tokenIn, &CustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		return h.secret, nil
	})
	if err != nil {
		return nil, err
	}

	if token.Valid {
		return token.Claims.(*CustomClaims), nil
	} else if errors.Is(err, jwt.ErrTokenMalformed) {
		return nil, ErrorBadToken
	} else if errors.Is(err, jwt.ErrTokenExpired) {
		return nil, ErrorTimeout
	} else if errors.Is(err, jwt.ErrTokenNotValidYet) {
		return nil, ErrorNotValid
	} else {
		return nil, ErrorUndefined
	}
}

func (h *Helper) GeneratePair(userID string) (*Pair, error) {
	// access
	claimsAccess := newClaims(userID, AccessTokenTTL)
	accessToken, err := h.generateToken(claimsAccess)
	if err != nil {
		return nil, err
	}

	// refresh
	claimsRefresh := newClaims(userID, RefreshTokenTTL)
	refreshToken, err := h.generateToken(claimsRefresh)
	if err != nil {
		return nil, err
	}

	return &Pair{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}, nil
}

func (h *Helper) generateToken(claims *CustomClaims) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(h.secret)
}
