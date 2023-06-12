package usercontroller

import (
	"net/http"

	"backend/internal/domain/usecases/userusecase"
	"github.com/go-chi/chi/v5"
)

func (c *controller) deleteUserByID(rw http.ResponseWriter, r *http.Request) {
	IDUser := chi.URLParam(r, "IDUser")

	if !c.authHelper.IsEqualIDUser(r, IDUser) {
		rw.WriteHeader(http.StatusForbidden)
		return
	}

	err := c.userUsecase.DeleteByID(r.Context(), userusecase.DeleteByIDRequest{IDUser: IDUser})
	if err != nil {
		c.httpHelper.HandleError(rw, err)
		return
	}

	rw.WriteHeader(http.StatusNoContent)
}
