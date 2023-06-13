package validate

import (
	"regexp"

	"backend/internal/domain/exceptions"
)

const (
	MilLenFirstName  = 3
	MaxLenFirstName  = 15
	MilLenSecondName = 3
	MaxLenSecondName = 15
	MilLenUserName   = 3
	MaxLenUserName   = 10
)

var (
	regexpUserNameShouldNotContain = regexp.MustCompile(`[^0-9a-zA-Z_]`)
	regexpNameShouldNotContain     = regexp.MustCompile(`[^\p{L} ]`)
)

func FirstNameSimple(firstName string) exceptions.Error {
	if len(firstName) < MilLenFirstName {
		return exceptions.ErrShortFirstName
	}

	if len(firstName) > MaxLenFirstName {
		return exceptions.ErrLongFirstName
	}

	if regexpNameShouldNotContain.MatchString(firstName) {
		return exceptions.ErrFirstNameHasNoLetter
	}

	return nil
}

func SecondNameSimple(secondName string) exceptions.Error {
	if len(secondName) < MilLenSecondName {
		return exceptions.ErrShortSecondName
	}

	if len(secondName) > MaxLenSecondName {
		return exceptions.ErrLongSecondName
	}

	if regexpNameShouldNotContain.MatchString(secondName) {
		return exceptions.ErrSecondNameHasNoLetter
	}

	return nil
}

func UserNameSimple(username string) exceptions.Error {
	if len(username) < MilLenUserName {
		return exceptions.ErrShortUserName
	}

	if len(username) > MaxLenUserName {
		return exceptions.ErrLongUserName
	}

	if regexpUserNameShouldNotContain.MatchString(username) {
		return exceptions.ErrUserNameHasNotNumberOrNoLetter
	}

	return nil
}
