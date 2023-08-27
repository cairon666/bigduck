package exceptions

import "fmt"

type InternalError struct {
	msg string
	err error
}

func NewInternalErr(msg string, err error) error {
	return &InternalError{msg: msg, err: err}
}

func (i *InternalError) Error() string {
	return fmt.Sprintf("%s: %e", i.msg, i.err)
}
