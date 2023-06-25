package validate

import (
	"time"

	"backend/internal/exceptions"
	"github.com/google/uuid"
)

func EmailSimple(email string) *exceptions.ValidateError {
	if ok := regexpEmailSimple.MatchString(email); !ok {
		return exceptions.ErrBadFormatEmail
	}

	return nil
}

func DayOfBirth(date time.Time) *exceptions.ValidateError {
	if date.After(time.Now()) {
		return exceptions.ErrDateOfBirthFromFeature
	}

	return nil
}

func AvatarURL(url string) *exceptions.ValidateError {
	if ok := regexpURLSimple.MatchString(url); !ok {
		return exceptions.ErrBadFormatAvatarURL
	}

	return nil
}

func Gender(gender string) *exceptions.ValidateError {
	if gender == "male" ||
		gender == "female" {
		return nil
	}

	return exceptions.ErrBadFormatGender
}

func UUIDSimple(id string) *exceptions.ValidateError {
	if _, err := uuid.Parse(id); err != nil {
		return exceptions.ErrBadFormatUUID
	}

	return nil
}
