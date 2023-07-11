package validate

import (
	"fmt"
	"strings"
)

type (
	// Code - enum code for Field.Code
	Code  int
	Field struct {
		Message string `json:"message"`
		Code    Code   `json:"code"`
	}
	Error struct {
		Fields map[string]*Field
	}
)

func NewValidateError() *Error {
	return &Error{
		Fields: make(map[string]*Field),
	}
}

func NewValidateField(msg string, code Code) *Field {
	return &Field{
		Message: msg,
		Code:    code,
	}
}

func (e *Error) Error() string {
	out := strings.Builder{}

	out.WriteString("validate: \n")

	for key, value := range e.Fields {
		out.WriteString(fmt.Sprintf("\t%s: message %s, code: %d\n", key, value.Message, value.Code))
	}

	return out.String()
}

func (e *Error) AddField(key string, field *Field) *Error {
	if field == nil {
		return e
	}

	e.Fields[key] = field

	return e
}

func (e *Error) IsNotEmpty() bool {
	return e.Fields != nil && len(e.Fields) != 0
}

func (e *Error) ToError() error {
	if e.IsNotEmpty() {
		return e
	}

	return nil
}
