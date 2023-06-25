package validate

import "backend/internal/exceptions"

const (
	MinLenPassword = 8
)

func PasswordSimple(password string) *exceptions.ValidateError {
	if len(password) < MinLenPassword {
		return exceptions.ErrShortPassword
	}

	if ok := regexpSpecialCharacter.MatchString(password); !ok {
		return exceptions.ErrPasswordShouldSpecialCharacter
	}

	if ok := regexpOneDigital.MatchString(password); !ok {
		return exceptions.ErrPasswordShouldOneDigital
	}

	if ok := regexpOneUpperCharacter.MatchString(password); !ok {
		return exceptions.ErrPasswordShouldOneUpperCharacter
	}

	if ok := regexpOneLowerCharacter.MatchString(password); !ok {
		return exceptions.ErrPasswordShouldOneLowerCharacter
	}

	return nil
}

func NewPasswordSimple(password string) *exceptions.ValidateError {
	if len(password) < MinLenPassword {
		return exceptions.ErrShortNewPassword
	}

	if ok := regexpSpecialCharacter.MatchString(password); !ok {
		return exceptions.ErrNewPasswordShouldSpecialCharacter
	}

	if ok := regexpOneDigital.MatchString(password); !ok {
		return exceptions.ErrNewPasswordShouldOneDigital
	}

	if ok := regexpOneUpperCharacter.MatchString(password); !ok {
		return exceptions.ErrNewPasswordShouldOneUpperCharacter
	}

	if ok := regexpOneLowerCharacter.MatchString(password); !ok {
		return exceptions.ErrNewPasswordShouldOneLowerCharacter
	}

	return nil
}
