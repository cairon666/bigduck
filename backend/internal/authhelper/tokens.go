package authhelper

import (
	"github.com/golang-jwt/jwt/v5"
)

const (
	AccessNameToken  = "Access-Token"
	RefreshNameToken = "Refresh-Token"
)

func (h *Helper) NewTokens(id string) (string, string, error) {
	accessClaims, err := h.newAccessClaims(id)
	if err != nil {
		return "", "", err
	}

	refreshClaims, err := h.newRefreshClaims(id)
	if err != nil {
		return "", "", err
	}

	tokenAccess := jwt.NewWithClaims(jwt.SigningMethodHS256, accessClaims)
	tokenRefresh := jwt.NewWithClaims(jwt.SigningMethodHS256, refreshClaims)

	access, err := tokenAccess.SignedString(h.private)
	if err != nil {
		return "", "", err
	}

	refresh, err := tokenRefresh.SignedString(h.private)
	if err != nil {
		return "", "", err
	}

	return access, refresh, nil
}

func (h *Helper) UpdateTokens(refresh string) (string, string, error) {
	id, err := h.ParseToken(refresh)
	if err != nil {
		return "", "", err
	}

	newAccess, newRefresh, err := h.NewTokens(id.IDUser)
	if err != nil {
		return "", "", err
	}

	return newAccess, newRefresh, nil
}

func (h *Helper) ParseToken(tokenString string) (*Claims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		return h.private, nil
	})
	if err != nil {
		return nil, err
	}

	if claims, ok := token.Claims.(*Claims); ok && token.Valid {
		return claims, nil
	}

	return nil, err
}
