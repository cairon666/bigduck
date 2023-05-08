package authhelper

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

func (h *Helper) newAccessClaims(id string) (Claims, error) {
	genID, err := uuid.NewUUID()
	if err != nil {
		return Claims{}, err
	}

	return Claims{
		IDUser: id,
		RegisteredClaims: jwt.RegisteredClaims{
			Issuer:    h.issuer,
			Subject:   AccessNameToken,
			Audience:  nil,
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(h.ttlAccess)),
			IssuedAt:  nil,
			ID:        genID.String(),
		},
	}, nil
}

func (h *Helper) newRefreshClaims(id string) (Claims, error) {
	genID, err := uuid.NewUUID()
	if err != nil {
		return Claims{}, err
	}

	return Claims{
		IDUser: id,
		RegisteredClaims: jwt.RegisteredClaims{
			Issuer:    h.issuer,
			Subject:   RefreshNameToken,
			Audience:  nil,
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(h.ttlRefresh)),
			IssuedAt:  nil,
			ID:        genID.String(),
		},
	}, nil
}
