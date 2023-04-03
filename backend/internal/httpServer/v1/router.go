package v1

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"net/http"
	"time"
)

func (s *server) router() http.Handler {
	r := chi.NewMux()

	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(time.Second * 10))
	r.Use(s.authenticationMiddleware)

	r.Route("/api/v1", func(r chi.Router) {
		r.Route("/auth", func(r chi.Router) {
			r.Post("/register", s.registerHandler)
			r.Post("/login", s.loginHandler)
			r.Post("/refresh", s.refreshHandler)
			r.Post("/logout", s.logoutHandler)
		})

		r.Route("/user", func(r chi.Router) {
			r.Get("/{IdUser}", s.getUserById)
			r.Put("/{IdUser}", s.updateUserById)
			r.Delete("/{IdUser}", s.deleteUserById)
		})
	})

	return r
}
