package authhelper

import (
	"context"
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt/v5"
)

type (
	ctxKeyAuth int
	Claims     struct {
		IDUser string `json:"id_user"`
		jwt.RegisteredClaims
	}
)

const AuthorizationKey ctxKeyAuth = 0

var AuthorizationHeaderKey = "Authorization"

func (h *Helper) AuthorizationMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		headerValue := r.Header.Get(AuthorizationHeaderKey)

		if headerValue != "" {
			sep := strings.Split(headerValue, " ")
			if len(sep) != 2 { //nolint:gomnd
				w.WriteHeader(http.StatusUnauthorized)
				return
			}

			claims, err := h.ParseToken(sep[1])
			if err != nil {
				w.WriteHeader(http.StatusUnauthorized)
				return
			}

			ctx = context.WithValue(ctx, AuthorizationKey, claims)
		}

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func GetClaims(ctx context.Context) *Claims {
	if ctx == nil {
		return nil
	}

	if claims, ok := ctx.Value(AuthorizationKey).(*Claims); ok {
		return claims
	}

	return nil
}
