package authhelper

import (
	"time"

	"backend/internal/domain/models"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

type Claims struct {
	IDUser uuid.UUID       `json:"id_user"`
	Roles  []models.RoleID `json:"roles"`
	jwt.RegisteredClaims
}

func NewClaims(idUser uuid.UUID, roles []models.RoleID, claims jwt.RegisteredClaims) Claims {
	return Claims{
		IDUser:           idUser,
		Roles:            roles,
		RegisteredClaims: claims,
	}
}

func (h *AuthHelper) newAccessClaims(id uuid.UUID, roles []models.RoleID) (Claims, error) {
	genID, err := uuid.NewUUID()
	if err != nil {
		return Claims{}, err
	}

	claim := NewClaims(id, roles, jwt.RegisteredClaims{
		Issuer:    h.issuer,
		Subject:   AccessNameToken,
		Audience:  nil,
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(h.ttlAccess)),
		IssuedAt:  nil,
		ID:        genID.String(),
	})

	return claim, nil
}

func (h *AuthHelper) newRefreshClaims(id uuid.UUID, roles []models.RoleID) (Claims, error) {
	genID, err := uuid.NewUUID()
	if err != nil {
		return Claims{}, err
	}

	claim := NewClaims(id, roles, jwt.RegisteredClaims{
		Issuer:    h.issuer,
		Subject:   RefreshNameToken,
		Audience:  nil,
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(h.ttlRefresh)),
		IssuedAt:  nil,
		ID:        genID.String(),
	})

	return claim, nil
}
