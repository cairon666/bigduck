package validate

import "errors"

var (
	ErrBadEmail        = errors.New("bad email")
	ErrShortPassword   = errors.New("short password")
	ErrShortFirstName  = errors.New("short first name")
	ErrShortSecondName = errors.New("short second name")
	ErrBadAvatarURL    = errors.New("bad avatar url")
	ErrUnknownGender   = errors.New("unknown gender")
	ErrBadUUID         = errors.New("bad uuid")
	ErrBadData         = errors.New("bad data")
)
