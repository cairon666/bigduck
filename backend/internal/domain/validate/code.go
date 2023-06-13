package validate

import (
	"regexp"

	"backend/internal/domain/exceptions"
)

var (
	regexpCodeSimple = regexp.MustCompile(`^[0-9]{4}$`)
)

func RecoverPasswordCodeSimple(code string) exceptions.Error {
	if ok := regexpCodeSimple.MatchString(code); !ok {
		return exceptions.ErrNotValidRecoverCode
	}

	return nil
}

func ConfirmEmailCodeSimple(code string) exceptions.Error {
	if ok := regexpCodeSimple.MatchString(code); !ok {
		return exceptions.ErrNotValidEmailConfirmCode
	}

	return nil
}
