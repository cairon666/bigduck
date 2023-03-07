package http

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"net/http"
	"time"
)

func (s *server) router() http.Handler {
	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(60 * time.Second))
	r.Use(s.helper.Middleware)

	r.Route("/api/v1", func(r chi.Router) {
		r.Route("/auth", func(r chi.Router) {
			r.Post("/login", s.loginHandler)
			r.Post("/register/first", s.registerFirstHandler)
			r.Post("/register/second", s.registerSecondHandler)
			r.Post("/register/third", s.registerThirdHandler)
			r.Post("/refresh", s.refreshHandler)
			r.Post("/logout", s.logoutHandler)
			r.Post("/email_is_unique", s.emailIsUniqueHandler)
		})

		r.Route("/attachment", func(r chi.Router) {
			r.Post("/", nil)
			r.Get("/{id}", nil)
		})

		r.Route("/user", func(r chi.Router) {
			r.Get("/{id_user}", nil)
			r.Put("/{id_user}", nil)

			r.Route("/quiz", func(r chi.Router) {
				r.Post("/", nil)
				r.Get("/{id_quiz}", nil)
				r.Put("/{id_quiz}", nil)
				r.Delete("/{id_quiz}", nil)

				r.Route("/question", func(r chi.Router) {
					r.Get("/{id_question}", nil)
					r.Put("/{id_question}", nil)
					r.Delete("/{id_question}", nil)
				})
			})
		})
	})

	return r
}
