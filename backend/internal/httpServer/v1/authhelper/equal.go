package authhelper

import (
	"context"
	"net/http"
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

func (h *helper) IsEqualIDUser(r *http.Request, id string) bool {
	if ctxIDUser, ok := getClaims(r.Context()); ok && ctxIDUser.IDUser == id {
		return true
	}

	return false
}
