package jwt

import (
	"context"
	"fmt"
	"net/http"
	"strings"
)

type AuthorizationKey string

var UserIdKey = AuthorizationKey("user_id")

func (h *Helper) Middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
		ctx := r.Context()

		authHeader := r.Header.Get("Authorization")
		if authHeader != "" {
			jwtToken := strings.TrimPrefix(authHeader, "Bearer ")

			tokenMC, err := h.ParseToken(jwtToken)
			if err == nil {
				ctx = context.WithValue(r.Context(), UserIdKey, tokenMC.UserID)
			}
		}

		fmt.Println(ctx.Value(UserIdKey))
		next.ServeHTTP(rw, r.WithContext(ctx))
	})
}
