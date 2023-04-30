package validate

import (
	"backend/internal/exceptions"
)

func TestPointer[T any](param *T, f func(T) error) error {
	if param != nil {
		return f(*param)
	}

	return nil
}

func Test(errs ...error) error {
	validErr := exceptions.NewValidateError()

	for _, err := range errs {
		if err != nil {
			validErr.AddError(err)
		}
	}

	if validErr.IsEmpty() {
		return nil
	}

	return validErr
}
