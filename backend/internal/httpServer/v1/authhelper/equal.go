package authhelper

import (
	"context"
	"net/http"

	"backend/internal/domain/models"
	"backend/internal/exceptions"
	"github.com/google/uuid"
	"github.com/samber/lo"
)

func getClaims(ctx context.Context) (*Claims, bool) {
	if ctx == nil {
		return nil, false
	}

	if claims, ok := ctx.Value(AuthorizationKey).(*Claims); ok {
		return claims, true
	}

	return nil, false
}

func (h *AuthHelper) IsEqualOrAdmin(r *http.Request, id uuid.UUID) error {
	if ctx, ok := getClaims(r.Context()); ok {
		if ctx.IDUser == id {
			return nil
		}

		if lo.Contains(ctx.Roles, models.RoleIDAdmin) {
			return nil
		}
	}

	return exceptions.ErrForbidden
}

func (h *AuthHelper) ParseIDUser(r *http.Request) (uuid.UUID, bool) {
	ctxIDUser, ok := getClaims(r.Context())
	if !ok {
		return uuid.Nil, false
	}

	return ctxIDUser.IDUser, true
}
