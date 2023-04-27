package v1

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func (s *Server) router() http.Handler {
	r := chi.NewMux()

	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(s.authenticationMiddleware)

	r.Route("/api/v1", func(r chi.Router) {
		r.Route("/auth", func(r chi.Router) {
			r.Post("/register", s.registerHandler)
			r.Post("/login", s.loginHandler)
			r.Post("/refresh", s.refreshHandler)
			r.Post("/logout", s.logoutHandler)
		})

		r.Route("/user", func(r chi.Router) {
			r.Get("/{IDUser}", s.getUserByID)
			r.Put("/{IDUser}", s.updateUserByID)
			r.Delete("/{IDUser}", s.deleteUserByID)
		})
	})

	return r
}