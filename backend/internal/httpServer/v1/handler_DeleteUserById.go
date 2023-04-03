package v1

import (
	"backend/internal/domain/usecases/userUsecase"
	"backend/pkg/beda"
	"github.com/go-chi/chi/v5"
	"net/http"
)

func (s *server) deleteUserById(rw http.ResponseWriter, r *http.Request) {
	IdUser := chi.URLParam(r, "IdUser")

	if err := shouldEqualIdUserOrAdmin(r, IdUser); err != nil {
		s.handleError(rw, beda.Wrap("shouldEqualIdUserOrAdmin", err))
		return
	}

	err := s.userUsecase.DeleteById(r.Context(), userUsecase.DeleteByIdRequest{IdUser: IdUser})
	if err != nil {
		s.handleError(rw, beda.Wrap("DeleteById", err))
		return
	}

	rw.WriteHeader(http.StatusNoContent)
}
