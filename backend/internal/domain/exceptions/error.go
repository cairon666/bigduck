package exceptions

import "strings"

type (
	ErrorCode int
	Error     interface {
		error
		Message() string
		Code() ErrorCode
	}
	AppError interface {
		error
		Errors() []Error
		Add(err Error)
		IsEmpty() bool
	}
)

// appError - implication of AppError
type appError struct {
	errors []Error
}

func NewAppError() AppError {
	return &appError{}
}

func NewAppErrorFromErrors(errors []Error) AppError {
	return &appError{
		errors: errors,
	}
}

func (e *appError) Error() string {
	builder := strings.Builder{}

	for _, err := range e.errors {
		builder.WriteString(err.Error())
	}

	return builder.String()
}

func (e *appError) Errors() []Error {
	return e.errors
}

func (e *appError) Add(err Error) {
	e.errors = append(e.errors, err)
}

func (e *appError) IsEmpty() bool {
	return len(e.errors) == 0
}

// errorImpl - implication of Error
type errorImpl struct { //nolint:errname
	message string
	code    ErrorCode
}

func NewError(message string, code ErrorCode) Error {
	return &errorImpl{message: message, code: code}
}

func (e *errorImpl) Error() string {
	return e.message
}

func (e *errorImpl) Message() string {
	return e.message
}

func (e *errorImpl) Code() ErrorCode {
	return e.code
}
