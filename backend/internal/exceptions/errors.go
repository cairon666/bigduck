package exceptions

var (
	ErrIDUserForeignKey            = ErrNotFound
	ErrIDRoleForeignKey            = ErrNotFound
	ErrIDAlreadyExist              = NewAppError("ErrIDAlreadyExist", CodeIDAlreadyExist)
	ErrRoleAlreadyExist            = NewAppError("ErrRoleAlreadyExist", CodeRoleAlreadyExist)
	ErrEmailAlreadyExist           = NewAppError("ErrEmailAlreadyExist", CodeEmailAlreadyExist)
	ErrUserNameAlreadyExist        = NewAppError("ErrUserNameAlreadyExist", CodeUserNameAlreadyExist)
	ErrNotFound                    = NewAppError("not found", CodeNotFound)
	ErrBadPassword                 = NewAppError("bad password", CodeBadPassword)
	ErrBadRecoverCode              = NewAppError("bad recover code", CodeBadRecoverCode)
	ErrRecoverEmailNotConfirm      = NewAppError("email was not be confirm", CodeRecoverEmailNotConfirm)
	ErrNewPasswordEqualOldPassword = NewAppError("ErrNewPasswordEqualOldPassword", CodeNewPasswordEqualOldPassword)
	ErrWrongOldPassword            = NewAppError("WrongOldPassword", CodeWrongOldPassword)
	ErrNewEmailEqualOldEmail       = NewAppError("ErrNewEmailEqualOldEmail", CodeNewEmailEqualOldEmail)
)
