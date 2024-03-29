package v1

import (
	"net/http"

	"backend/pkg/middleware"

	"github.com/go-chi/chi/v5"
	"github.com/riandyrn/otelchi"
)

func (s *Server) router() http.Handler {
	r := chi.NewRouter()

	r.Use(s.RecovererMiddleware)
	r.Use(middleware.BodyCloser)
	r.Use(otelchi.Middleware("backend_service"))
	r.Use(middleware.RequestID)
	r.Use(s.CorsMiddleware)
	r.Use(s.authHelper.AuthorizationMiddleware)

	controllers := []Controller{
		s.authController,
		s.userController,
		s.attachmentController,
	}

	r.Route("/api/v1", func(r chi.Router) {
		for _, controller := range controllers {
			controller.RegisterRouter(r)
		}
	})

	return r
}
