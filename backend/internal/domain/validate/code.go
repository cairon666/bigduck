package validate

import (
	"regexp"

	"backend/internal/exceptions"
)

var (
	regexpCodeSimple = regexp.MustCompile(`^[0-9]{4}$`)
)

func RecoverPasswordCodeSimple(code string) *exceptions.ValidateError {
	if ok := regexpCodeSimple.MatchString(code); !ok {
		return exceptions.ErrBadFormatRecoverCode
	}

	return nil
}

func ConfirmEmailCodeSimple(code string) *exceptions.ValidateError {
	if ok := regexpCodeSimple.MatchString(code); !ok {
		return exceptions.ErrBadFormatEmailConfirmCode
	}

	return nil
}
