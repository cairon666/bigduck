package validate

import (
	"backend/internal/exceptions"
)

func TestPointer[T any](param *T, f func(T) exceptions.Error) exceptions.Error {
	if param != nil {
		return f(*param)
	}

	return nil
}

func Test(errs ...exceptions.Error) error {
	appErr := exceptions.NewAppError()

	for _, err := range errs {
		if err != nil {
			appErr.Add(err)
		}
	}

	if appErr.IsEmpty() {
		return nil
	}

	return appErr
}
