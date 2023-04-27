package authhelper

import (
	"time"

	"backend/pkg/beda"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

type Claims struct {
	IDUser string `json:"id_user"`
	jwt.RegisteredClaims
}

func (h *helper) newAccessClaims(id string) (Claims, error) {
	genID, err := uuid.NewUUID()
	if err != nil {
		return Claims{}, beda.Wrap("NewUUID", err)
	}

	return Claims{
		IDUser: id,
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

func (h *helper) newRefreshClaims(id string) (Claims, error) {
	genID, err := uuid.NewUUID()
	if err != nil {
		return Claims{}, beda.Wrap("NewUUID", err)
	}

	return Claims{
		IDUser: id,
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
