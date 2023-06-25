package exceptions

import (
	"fmt"
	"strings"
)

type (
	ValidateError struct {
		Message string
		Code    ErrorCode
	}
	MultiValidateError struct {
		Errs []*ValidateError
	}
)

func NewValidateError(msg string, code ErrorCode) *ValidateError {
	return &ValidateError{
		msg,
		code,
	}
}

func NewMultiValidateError() *MultiValidateError {
	return &MultiValidateError{
		Errs: make([]*ValidateError, 0),
	}
}

func (e *ValidateError) Error() string {
	return fmt.Sprintf("validate err: %s, code: %d", e.Message, e.Code)
}

func (e *MultiValidateError) Error() string {
	b := strings.Builder{}

	b.WriteString("multi validate error: ")

	for _, err := range e.Errs {
		b.WriteString(err.Error())
		b.WriteString(",")
	}

	return b.String()
}

func (e *MultiValidateError) Append(err *ValidateError) {
	if err == nil {
		return
	}

	e.Errs = append(e.Errs, err)
}

func (e *MultiValidateError) AsError() error {
	if len(e.Errs) == 0 {
		return nil
	}

	return e
}

var (
	ErrPasswordShouldSpecialCharacter     = NewValidateError("ErrPasswordShouldSpecialCharacter", CodePasswordShouldSpecialCharacter)         //nolint:lll
	ErrPasswordShouldOneDigital           = NewValidateError("ErrPasswordShouldOneDigital", CodePasswordShouldOneDigital)                     //nolint:lll
	ErrPasswordShouldOneUpperCharacter    = NewValidateError("ErrPasswordShouldOneUpperCharacter", CodePasswordShouldOneUpperCharacter)       //nolint:lll
	ErrPasswordShouldOneLowerCharacter    = NewValidateError("ErrPasswordShouldOneLowerCharacter", CodePasswordShouldOneLowerCharacter)       //nolint:lll
	ErrNewPasswordShouldSpecialCharacter  = NewValidateError("ErrNewPasswordShouldSpecialCharacter", CodeNewPasswordShouldSpecialCharacter)   //nolint:lll
	ErrNewPasswordShouldOneDigital        = NewValidateError("ErrNewPasswordShouldOneDigital", CodeNewPasswordShouldOneDigital)               //nolint:lll
	ErrNewPasswordShouldOneUpperCharacter = NewValidateError("ErrNewPasswordShouldOneUpperCharacter", CodeNewPasswordShouldOneUpperCharacter) //nolint:lll
	ErrNewPasswordShouldOneLowerCharacter = NewValidateError("ErrNewPasswordShouldOneLowerCharacter", CodeNewPasswordShouldOneLowerCharacter) //nolint:lll
	ErrShortPassword                      = NewValidateError("short password", CodeShortPassword)
	ErrShortNewPassword                   = NewValidateError("short new password", CodeShortNewPassword)
	ErrBadFormatEmail                     = NewValidateError("bad format email", CodeBadFormatEmail)
	ErrBadFormatEmailConfirmCode          = NewValidateError("NotValidEmailConfirmCode", CodeBadFormatEmailConfirmCode)
	ErrBadFormatGender                    = NewValidateError("bad format gender", CodeBadFormatGender)
	ErrShortFirstName                     = NewValidateError("short first name", CodeShortFirstName)

	// ErrBadFormatFirstName - should contain only letter and spaces
	ErrBadFormatFirstName = NewValidateError("ErrBadFormatFirstName", CodeBadFormatFirstName)
	ErrLongFirstName      = NewValidateError("LongFirstName", CodeLongFirstName)
	ErrShortSecondName    = NewValidateError("short second name", CodeShortSecondName)
	ErrLongSecondName     = NewValidateError("LongSecondName", CodeLongSecondName)

	// ErrBadFormatSecondName - should contain only letter and spaces
	ErrBadFormatSecondName = NewValidateError("SecondNameHasNoLetter", CodeBadFormatSecondName)
	ErrShortUserName       = NewValidateError("ShortUserName", CodeShortUserName)
	ErrLongUserName        = NewValidateError("LongUserName", CodeLongUserName)

	// ErrBadFormatUserName - should contain only 0-9, a-z, A-Z and _
	ErrBadFormatUserName      = NewValidateError("UserNameHasNotNumberOrNoLetter", CodeBadFormatUserName)
	ErrBadFormatAvatarURL     = NewValidateError("bad format avatar url", CodeBadFormatAvatarURL)
	ErrBadFormatUUID          = NewValidateError("bad format uuid", CodeBadFormatUUID)
	ErrBadFormatRecoverCode   = NewValidateError("bad format recover code", CodeBadFormatRecoverCode)
	ErrDateOfBirthFromFeature = NewValidateError("are u from feature?", CodeDateOfBirthFromFeature)
)
