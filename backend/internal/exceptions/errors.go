package exceptions

import "errors"

var (
	ErrorNotFound          = errors.New("not found")
	ErrorEmailAlreadyExist = errors.New("email already exist")
	ErrorDatabase          = errors.New("database")
	ErrorUnknown           = errors.New("unknown")
	ErrorBadPassword       = errors.New("bad password")
	ErrorValidation        = errors.New("validate")
)
