package httphelper

import (
	"net/http"

	"backend/internal/exceptions/validate"
)

type ValidateHTTPError struct {
	HTTPError
	Validate map[string]*validate.Field `json:"validate"`
}

func (h *HTTPHelper) sendValidateError(w http.ResponseWriter, err *validate.Error) {
	h.SendJSON(w, ValidateHTTPError{HTTPError{"validate"}, err.Fields}, http.StatusBadRequest)
}
