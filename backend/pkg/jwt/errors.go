package jwt

import (
	"authService/pkg/beda"
)

var (
	ErrorBadToken  = beda.New("bad token", nil)
	ErrorTimeout   = beda.New("timeout token", nil)
	ErrorNotValid  = beda.New("invalid token", nil)
	ErrorUndefined = beda.New("undefined token", nil)
)
