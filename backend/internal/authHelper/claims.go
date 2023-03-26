package authHelper

import (
	"backend/pkg/beda"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"time"
)

type Claims struct {
	IdUser string `json:"id_user"`
	jwt.RegisteredClaims
}

func (h *helper) newAccessClaims(IdUser string) (Claims, error) {
	genID, err := uuid.NewUUID()
	if err != nil {
		return Claims{}, beda.Wrap("NewUUID", err)
	}

	return Claims{
		IdUser: IdUser,
		RegisteredClaims: jwt.RegisteredClaims{
			Issuer:    "",
			Subject:   accessNameToken,
			Audience:  nil,
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(h.ttlAccess)),
			IssuedAt:  nil,
			ID:        genID.String(),
		},
	}, nil
}

func (h *helper) newRefreshClaims(IdUser string) (Claims, error) {
	genID, err := uuid.NewUUID()
	if err != nil {
		return Claims{}, beda.Wrap("NewUUID", err)
	}

	return Claims{
		IdUser: IdUser,
		RegisteredClaims: jwt.RegisteredClaims{
			Issuer:    "",
			Subject:   refreshNameToken,
			Audience:  nil,
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(h.ttlRefresh)),
			IssuedAt:  nil,
			ID:        genID.String(),
		},
	}, nil
}
