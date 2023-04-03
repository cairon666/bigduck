package authhelper

import (
	"backend/pkg/beda"
	"github.com/golang-jwt/jwt/v5"
)

const (
	accessNameToken  = "Access-Token"
	refreshNameToken = "Refresh-Token"
)

func (h *helper) NewTokens(id string) (string, string, error) {
	accessClaims, err := h.newAccessClaims(id)
	if err != nil {
		return "", "", beda.Wrap("accessClaims.newAccessClaims", err)
	}

	refreshClaims, err := h.newRefreshClaims(id)
	if err != nil {
		return "", "", beda.Wrap("refreshClaims.newAccessClaims", err)
	}

	tokenAccess := jwt.NewWithClaims(jwt.SigningMethodHS256, accessClaims)
	tokenRefresh := jwt.NewWithClaims(jwt.SigningMethodHS256, refreshClaims)

	access, err := tokenAccess.SignedString(h.private)
	if err != nil {
		return "", "", beda.Wrap("access.SignedString", err)
	}

	refresh, err := tokenRefresh.SignedString(h.private)
	if err != nil {
		return "", "", beda.Wrap("refresh.SignedString", err)
	}

	return access, refresh, nil
}

func (h *helper) UpdateTokens(refresh string) (string, string, error) {
	id, err := h.ParseToken(refresh)
	if err != nil {
		return "", "", beda.Wrap("ParseToken", err)
	}

	newAccess, newRefresh, err := h.NewTokens(id.IDUser)
	if err != nil {
		return "", "", beda.Wrap("NewTokens", err)
	}

	return newAccess, newRefresh, nil
}

func (h *helper) ParseToken(tokenString string) (*Claims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		return h.private, nil
	})
	if err != nil {
		return nil, beda.Wrap("ParseWithClaims", err)
	}

	if claims, ok := token.Claims.(*Claims); ok && token.Valid {
		return claims, nil
	}

	return nil, beda.Wrap("Not claims", err)
}
