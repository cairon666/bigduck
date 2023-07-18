package exceptions

type ErrorCode int

const (
	CodeNotFound ErrorCode = 1 + iota
	CodeEmailAlreadyExist
	CodeBadPassword
	CodeBadRecoverCode
	CodeRecoverEmailNotConfirm
	CodeNewPasswordEqualOldPassword
	CodeWrongOldPassword
	CodeUserNameAlreadyExist
	CodeIDAlreadyExist
	CodeRoleAlreadyExist
	CodeNewEmailEqualOldEmail
)
