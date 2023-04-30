package validate

import (
	"time"

	"github.com/google/uuid"
)

const (
	MinLenPassword   = 8
	MilLenFirstName  = 3
	MilLenSecondName = 3
)

func EmailSimple(email string) error {
	if ok := regexpEmailSimple.MatchString(email); !ok {
		return ErrBadEmail
	}

	return nil
}

func PasswordSimple(password string) error {
	if len(password) < MinLenPassword {
		return ErrShortPassword
	}

	return nil
}

func FirstNameSimple(firstName string) error {
	if len(firstName) < MilLenFirstName {
		return ErrShortFirstName
	}

	return nil
}

func SecondNameSimple(secondName string) error {
	if len(secondName) < MilLenSecondName {
		return ErrShortSecondName
	}

	return nil
}

func DayOfBirth(date time.Time) error {
	if date.After(time.Now()) {
		return ErrBadData
	}

	return nil
}

func AvatarURL(url string) error {
	if ok := regexpURLSimple.MatchString(url); !ok {
		return ErrBadAvatarURL
	}

	return nil
}

func Gender(gender string) error {
	if gender == "male" ||
		gender == "female" {
		return nil
	}

	return ErrUnknownGender
}

func UUIDSimple(id string) error {
	if _, err := uuid.Parse(id); err != nil {
		return ErrBadUUID
	}

	return nil
}
