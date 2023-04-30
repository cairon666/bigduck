package exceptions

import (
	"net/http"
	"strings"
)

type ValidateError struct {
	HTTPError
	Details []string `json:"details"`
}

func NewValidateError() *ValidateError {
	return &ValidateError{
		HTTPError: HTTPError{
			Message: "validate",
			code:    http.StatusBadRequest,
		},
		Details: nil,
	}
}

func (v *ValidateError) Error() string {
	buf := new(strings.Builder)

	buf.WriteString("validate error: ")

	for index, err := range v.Details {
		buf.WriteString(err)

		if index != len(v.Details)-1 {
			buf.WriteString(", ")
		}
	}

	return buf.String()
}

func (v *ValidateError) AddError(err error) {
	if err != nil {
		v.Details = append(v.Details, err.Error())
	}
}

func (v *ValidateError) Errors() []string {
	return v.Details
}
func (v *ValidateError) IsEmpty() bool {
	return len(v.Details) == 0
}

func (v *ValidateError) GetCode() int {
	return v.code
}

func (v *ValidateError) GetData() any {
	return v
}
