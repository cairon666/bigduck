package middleware

import (
	"io"
	"net/http"
)

func BodyCloser(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		next.ServeHTTP(w, r)

		_, _ = io.Copy(io.Discard, r.Body)
		_ = r.Body.Close()
	})
}
