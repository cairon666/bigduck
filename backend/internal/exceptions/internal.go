package exceptions

import "fmt"

// InternalError - ошибка, которая возникает на низком уровне и которая не была коректно обработана
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
