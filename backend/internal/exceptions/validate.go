package exceptions

import (
	"bytes"
)

type ValidateError struct {
	message string
	errors  []string
}

func NewValidate(message string) *ValidateError {
	return &ValidateError{
		message: message,
	}
}

func (v *ValidateError) Error() string {
	buf := new(bytes.Buffer)

	_, _ = buf.WriteString(v.message)
	_, _ = buf.WriteString(": ")

	for index, err := range v.errors {
		_, _ = buf.WriteString(err)
		if index != len(v.errors)-1 {
			_, _ = buf.WriteString(", ")
		}
	}

	return buf.String()
}

func (v *ValidateError) Message() string {
	return v.message
}

func (v *ValidateError) AddErrors(errs ...string) {
	v.errors = append(v.errors, errs...)
}

func (v *ValidateError) Errors() []string {
	return v.errors
}
