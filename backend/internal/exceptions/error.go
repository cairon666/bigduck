package exceptions

import (
	"fmt"
)

type Error struct {
	Message string    `json:"message"`
	Code    ErrorCode `json:"code"`
}

func NewAppError(msg string, code ErrorCode) *Error {
	return &Error{Message: msg, Code: code}
}

func (e *Error) Error() string {
	return fmt.Sprintf("app error: %s, code: %d", e.Message, e.Code)
}
