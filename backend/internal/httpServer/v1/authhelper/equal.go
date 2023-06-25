package authhelper

import (
	"context"
	"net/http"

	"backend/internal/exceptions"
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

func (h *helper) IsEqualIDUser(r *http.Request, id string) error {
	if ctxIDUser, ok := getClaims(r.Context()); ok && ctxIDUser.IDUser == id {
		return nil
	}

	return exceptions.ErrForbidden
}

func (h *helper) ParseIDUser(r *http.Request) (string, bool) {
	ctxIDUser, ok := getClaims(r.Context())
	if !ok {
		return "", false
	}

	return ctxIDUser.IDUser, true
}
