package exceptions

const (
	CodeNotFound ErrorCode = 1 + iota
	CodeEmailAlreadyExist
	CodeBadPassword
	CodeGenderNotFound
	CodeBadEmail
	CodeShortPassword
	CodeShortFirstName
	CodeShortSecondName
	CodeBadAvatarURL
	CodeUnknownGender
	CodeBadUUID
	CodeBadData
	CodeBadRecoverCode
	CodeRecoverEmailNotConfirm
	CodeNotValidRecoverCode
	CodeNewPasswordEqualOldPassword
	CodeDateOfBirthFromFeature
)

var (
	ErrNotFound                    = NewError("not found", CodeNotFound)
	ErrEmailAlreadyExist           = NewError("email already exist", CodeEmailAlreadyExist)
	ErrBadPassword                 = NewError("bad password", CodeBadPassword)
	ErrGenderNotFound              = NewError("gender not found", CodeGenderNotFound)
	ErrBadEmail                    = NewError("bad format email", CodeBadEmail)
	ErrShortPassword               = NewError("short password", CodeShortPassword)
	ErrShortFirstName              = NewError("short first name", CodeShortFirstName)
	ErrShortSecondName             = NewError("short second name", CodeShortSecondName)
	ErrBadAvatarURL                = NewError("bad avatar url", CodeBadAvatarURL)
	ErrUnknownGender               = NewError("unknown gender", CodeUnknownGender)
	ErrBadUUID                     = NewError("bad uuid", CodeBadUUID)
	ErrBadData                     = NewError("bad data format", CodeBadData)
	ErrBadRecoverCode              = NewError("bad recover code", CodeBadRecoverCode)
	ErrRecoverEmailNotConfirm      = NewError("email was not be confirm", CodeRecoverEmailNotConfirm)
	ErrNotValidRecoverCode         = NewError("recover code not valid", CodeNotValidRecoverCode)
	ErrNewPasswordEqualOldPassword = NewError("recover code not valid", CodeNewPasswordEqualOldPassword)
	ErrDateOfBirthFromFeature      = NewError("are u from feature?", CodeDateOfBirthFromFeature)
)
