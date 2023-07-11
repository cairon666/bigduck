package authhelper

import (
	"backend/internal/domain/models"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

const (
	AccessNameToken  = "Access-Token"
	RefreshNameToken = "Refresh-Token"
)

func (h *AuthHelper) NewTokens(id uuid.UUID, roles []models.RoleID) (string, string, error) {
	accessClaims, err := h.newAccessClaims(id, roles)
	if err != nil {
		return "", "", err
	}

	refreshClaims, err := h.newRefreshClaims(id, roles)
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

func (h *AuthHelper) UpdateTokens(refresh string) (string, string, error) {
	claim, err := h.ParseToken(refresh)
	if err != nil {
		return "", "", err
	}

	newAccess, newRefresh, err := h.NewTokens(claim.IDUser, claim.Roles)
	if err != nil {
		return "", "", err
	}

	return newAccess, newRefresh, nil
}

func (h *AuthHelper) ParseToken(tokenString string) (*Claims, error) {
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
