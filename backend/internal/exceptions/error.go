package exceptions

import (
	"fmt"
)

type Error struct {
	Message    string    `json:"message"`
	Code       ErrorCode `json:"code"`
	HTTPStatus int       `json:"-"`
}

func NewAppError(msg string, code ErrorCode, httpStatus int) *Error {
	return &Error{Message: msg, Code: code, HTTPStatus: httpStatus}
}

func (e *Error) Error() string {
	return fmt.Sprintf("app error: %s, code: %d", e.Message, e.Code)
}
