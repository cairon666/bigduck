package validate

import (
	"time"

	"backend/internal/domain/exceptions"
	"github.com/google/uuid"
)

const (
	MinLenPassword = 8
)

func EmailSimple(email string) exceptions.Error {
	if ok := regexpEmailSimple.MatchString(email); !ok {
		return exceptions.ErrBadEmail
	}

	return nil
}

func PasswordSimple(password string) exceptions.Error {
	if len(password) < MinLenPassword {
		return exceptions.ErrShortPassword
	}

	return nil
}

func DayOfBirth(date time.Time) exceptions.Error {
	if date.After(time.Now()) {
		return exceptions.ErrDateOfBirthFromFeature
	}

	return nil
}

func AvatarURL(url string) exceptions.Error {
	if ok := regexpURLSimple.MatchString(url); !ok {
		return exceptions.ErrBadAvatarURL
	}

	return nil
}

func Gender(gender string) exceptions.Error {
	if gender == "male" ||
		gender == "female" {
		return nil
	}

	return exceptions.ErrUnknownGender
}

func UUIDSimple(id string) exceptions.Error {
	if _, err := uuid.Parse(id); err != nil {
		return exceptions.ErrBadUUID
	}

	return nil
}
