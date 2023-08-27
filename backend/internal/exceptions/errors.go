package exceptions

import "net/http"

var (
	ErrIDUserForeignKey            = ErrNotFound
	ErrIDRoleForeignKey            = ErrNotFound
	ErrIDAlreadyExist              = NewAppError("ErrIDAlreadyExist", CodeIDAlreadyExist, http.StatusBadRequest)
	ErrRoleAlreadyExist            = NewAppError("ErrRoleAlreadyExist", CodeRoleAlreadyExist, http.StatusBadRequest)
	ErrEmailAlreadyExist           = NewAppError("ErrEmailAlreadyExist", CodeEmailAlreadyExist, http.StatusBadRequest)
	ErrUserNameAlreadyExist        = NewAppError("ErrUserNameAlreadyExist", CodeUserNameAlreadyExist, http.StatusBadRequest)
	ErrNotFound                    = NewAppError("not found", CodeNotFound, http.StatusNotFound)
	ErrBadPassword                 = NewAppError("bad password", CodeBadPassword, http.StatusBadRequest)
	ErrBadRecoverCode              = NewAppError("bad recover code", CodeBadRecoverCode, http.StatusBadRequest)
	ErrRecoverEmailNotConfirm      = NewAppError("email was not be confirm", CodeRecoverEmailNotConfirm, http.StatusBadRequest)
	ErrNewPasswordEqualOldPassword = NewAppError("ErrNewPasswordEqualOldPassword", CodeNewPasswordEqualOldPassword, http.StatusBadRequest)
	ErrWrongOldPassword            = NewAppError("WrongOldPassword", CodeWrongOldPassword, http.StatusBadRequest)
	ErrNewEmailEqualOldEmail       = NewAppError("ErrNewEmailEqualOldEmail", CodeNewEmailEqualOldEmail, http.StatusBadRequest)
	ErrLargeImage                  = NewAppError("ErrLargeImage", CodeLargeImage, http.StatusBadRequest)
	ErrBadImageExtension           = NewAppError("ErrBadImageExtension", CodeBadImageExtension, http.StatusBadRequest)
)
