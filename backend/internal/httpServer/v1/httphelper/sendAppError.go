package httphelper

import (
	"net/http"

	"backend/internal/exceptions"
)

type AppHTTPError struct {
	HTTPError
	Error *exceptions.Error `json:"error"`
}

func (h *HTTPHelper) sendAppError(w http.ResponseWriter, err *exceptions.Error) {
	h.SendJSON(w, AppHTTPError{HTTPError{"app"}, err}, http.StatusBadRequest)
}
