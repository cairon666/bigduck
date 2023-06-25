package validate

import (
	"backend/internal/exceptions"
)

func TestPointer[T any](param *T, f func(T) *exceptions.ValidateError) *exceptions.ValidateError {
	if param != nil {
		return f(*param)
	}

	return nil
}

func Test(errs ...*exceptions.ValidateError) error {
	errors := exceptions.NewMultiValidateError()

	for _, err := range errs {
		errors.Append(err)
	}

	return errors.AsError()
}
