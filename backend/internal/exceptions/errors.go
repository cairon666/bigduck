package exceptions

import (
	"net/http"
)

var (
	ErrNotFound          = NewHTTPError("not found", http.StatusNotFound)
	ErrEmailAlreadyExist = NewHTTPError("email already exist", http.StatusBadRequest)
	ErrInternal          = NewHTTPError("internal sever error", http.StatusInternalServerError)
	ErrDatabase          = ErrInternal
	ErrBadPassword       = NewHTTPError("bad password", http.StatusBadRequest)
	ErrForbidden         = NewHTTPError("forbidden", http.StatusForbidden)
	ErrGenderNotFound    = NewHTTPError("gender not found", http.StatusBadRequest)
	ErrUnknown           = NewHTTPError("unknown error", http.StatusBadRequest)
)
