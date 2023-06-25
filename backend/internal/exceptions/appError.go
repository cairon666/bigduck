package exceptions

import "fmt"

// AppError - ошибка в бизнес логике
type AppError struct {
	Msg  string
	Code ErrorCode
}

func NewAppError(msg string, code ErrorCode) error {
	return &AppError{Msg: msg, Code: code}
}

func (e *AppError) Error() string {
	return fmt.Sprintf("app error: %s, code: %d", e.Msg, e.Code)
}

var (
	ErrNotFound                    = NewAppError("not found", CodeNotFound)
	ErrEmailAlreadyExist           = NewAppError("email already exist", CodeEmailAlreadyExist)
	ErrBadPassword                 = NewAppError("bad password", CodeBadPassword)
	ErrBadRecoverCode              = NewAppError("bad recover code", CodeBadRecoverCode)
	ErrRecoverEmailNotConfirm      = NewAppError("email was not be confirm", CodeRecoverEmailNotConfirm)
	ErrNewPasswordEqualOldPassword = NewAppError("ErrNewPasswordEqualOldPassword", CodeNewPasswordEqualOldPassword)
	ErrWrongOldPassword            = NewAppError("WrongOldPassword", CodeWrongOldPassword)
	ErrBadEmailConfirmCode         = NewAppError("BadEmailConfirmCode", CodeBadEmailConfirmCode)
	ErrUsernameAlreadyExist        = NewAppError("UsernameAlreadyExist", CodeUsernameAlreadyExist)
)
