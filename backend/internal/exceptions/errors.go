package exceptions

import (
	"net/http"
)

var (
	ErrNotFound          = newErr("not found", http.StatusNotFound)
	ErrEmailAlreadyExist = newErr("email already exist", http.StatusBadRequest)
	ErrInternal          = newErr("internal sever error", http.StatusInternalServerError)
	ErrDatabase          = ErrInternal
	ErrBadPassword       = newErr("bad password", http.StatusBadRequest)
	ErrForbidden         = newErr("forbidden", http.StatusForbidden)
	ErrGenderNotFound    = newErr("gender not found", http.StatusBadRequest)
)
