package v1

import "net/http"

func (s *Server) CorsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", s.conf.HTTP.CORS.AllowedOrigin)
		w.Header().Set("Access-Control-Allow-Methods", s.conf.HTTP.CORS.AllowedMethod)
		w.Header().Set("Access-Control-Allow-Headers", s.conf.HTTP.CORS.AllowedHeaders)
		w.Header().Set("Access-Control-Allow-Credentials", s.conf.HTTP.CORS.AllowCredentials)
		w.Header().Set("Access-Control-Expose-Headers", s.conf.HTTP.CORS.ExposeHeaders)
		w.Header().Set("Access-Control-Max-Age", s.conf.HTTP.CORS.MaxAge)

		next.ServeHTTP(w, r)
	})
}
