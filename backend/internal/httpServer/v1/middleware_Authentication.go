package v1

import (
	"context"
	"net/http"
	"strings"

	"backend/pkg/logger"
)

type authKey uint32

const (
	idUserKey authKey = 1 + iota
)

func (s *Server) authenticationMiddleware(h http.Handler) http.Handler {
	return http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader != "" {
			claims, err := s.authHelper.ParseToken(strings.TrimPrefix(authHeader, "Bearer "))
			if err != nil {
				s.handleError(rw, err)

				return
			}

			s.log.Debug("auth claims", logger.Any("claims", claims))

			ctx := r.Context()
			ctx = context.WithValue(ctx, idUserKey, claims.IDUser)

			r = r.WithContext(ctx)
		}

		h.ServeHTTP(rw, r)
	})
}
