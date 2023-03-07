package validate

import (
	"authService/pkg/beda"
)

var (
	ErrorEmailInvalid      = beda.New("email is invalid", nil)
	ErrorPasswordInvalid   = beda.New("password is invalid", nil)
	ErrorEmailCodeInvalid  = beda.New("emailCode is invalid", nil)
	ErrorUuidInvalid       = beda.New("uuid is invalid", nil)
	ErrorFirstNameInvalid  = beda.New("firstName is invalid", nil)
	ErrorSecondNameInvalid = beda.New("secondName is invalid", nil)
)
