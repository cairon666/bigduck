package beda

import (
	"fmt"
)

type wrappedError struct {
	msg string
	err error
}

func (e *wrappedError) Error() string {
	return fmt.Sprintf("%s: %s", e.msg, e.err)
}

func (e *wrappedError) Unwrap() error {
	return e.err
}

func Wrap(msg string, err error) error {
	return &wrappedError{
		msg: msg,
		err: err,
	}
}
