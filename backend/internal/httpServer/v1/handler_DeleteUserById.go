package v1

import (
	"net/http"

	"backend/internal/domain/usecases/userusecase"
	"backend/pkg/beda"
	"github.com/go-chi/chi/v5"
)

func (s *Server) deleteUserByID(rw http.ResponseWriter, r *http.Request) {
	IDUser := chi.URLParam(r, "IDUser")

	if err := shouldEqualIDUserOrAdmin(r, IDUser); err != nil {
		s.handleError(rw, beda.Wrap("shouldEqualIDUserOrAdmin", err))

		return
	}

	err := s.userUsecase.DeleteByID(r.Context(), userusecase.DeleteByIDRequest{IDUser: IDUser})
	if err != nil {
		s.handleError(rw, beda.Wrap("DeleteByID", err))

		return
	}

	rw.WriteHeader(http.StatusNoContent)
}
