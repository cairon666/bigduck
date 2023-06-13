package v1

import (
	"net/http"

	"backend/pkg/middleware"
	"github.com/go-chi/chi/v5"
)

func (s *server) router() http.Handler {
	r := chi.NewRouter()

	r.Use(middleware.BodyCloser)
	r.Use(middleware.RequestID)
	r.Use(middleware.Recoverer)
	r.Use(s.CorsMiddleware)
	r.Use(s.authHelper.AuthorizationMiddleware)

	controllers := []Controller{
		s.authController,
		s.userController,
	}

	r.Route("/api/v1", func(r chi.Router) {
		for _, controller := range controllers {
			controller.RegisterRouter(r)
		}
	})

	return r
}
