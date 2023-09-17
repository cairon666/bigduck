package validate

import (
	"backend/internal/domain/models"
	"time"

	"github.com/google/uuid"
)

const (
	MilLenName     = 3
	MaxLenName     = 15
	MinLenPassword = 8
	MilLenUserName = 3
	MaxLenUserName = 10
)

// TestPointer - testing for optional field(like ref)
func TestPointer[T any](param *T, f func(T) *Field) *Field {
	if param != nil {
		return f(*param)
	}

	return nil
}

func TestDayOfBirth(date time.Time) *Field {
	if date.After(time.Now()) {
		return FieldFromFeature
	}

	return nil
}

func TestEmail(email string) *Field {
	if ok := regexpEmail.MatchString(email); !ok {
		return FieldBadFormat
	}

	return nil
}

func TestFilenameImage(filename string) *Field {
	if ok := regexpFilenameImage.MatchString(filename); !ok {
		return FieldBadFormat
	}

	return nil
}

func TestFourCode(code string) *Field {
	if ok := regexpFourCode.MatchString(code); !ok {
		return FieldBadFormat
	}

	return nil
}

func TestGender(gender string) *Field {
	if _, err := models.ParseGender(gender); err != nil {
		return FieldUnknownType
	}

	return nil
}

func TestName(firstName string) *Field {
	if len(firstName) < MilLenName {
		return FieldShort
	}

	if len(firstName) > MaxLenName {
		return FieldLong
	}

	if regexpNotNumberCharacterSpecial.MatchString(firstName) {
		return FieldBadFormat
	}

	return nil
}

func TestPassword(password string) *Field {
	if len(password) < MinLenPassword {
		return FieldShort
	}

	if ok := regexpSpecialCharacter.MatchString(password); !ok {
		return FieldSpecialCharacter
	}

	if ok := regexpOneDigital.MatchString(password); !ok {
		return FieldOneDigital
	}

	if ok := regexpOneUpperCharacter.MatchString(password); !ok {
		return FieldOneUpperCharacter
	}

	if ok := regexpOneLowerCharacter.MatchString(password); !ok {
		return FieldOneLowerCharacter
	}

	return nil
}

func TestURL(url string) *Field {
	if ok := regexpURL.MatchString(url); !ok {
		return FieldBadFormat
	}

	return nil
}

func TestUsername(username string) *Field {
	if len(username) < MilLenUserName {
		return FieldShort
	}

	if len(username) > MaxLenUserName {
		return FieldLong
	}

	if regexpNotLettersAndSpace.MatchString(username) {
		return FieldBadFormat
	}

	return nil
}

func TestUUID(id string) *Field {
	if _, err := uuid.Parse(id); err != nil {
		return FieldBadFormat
	}

	return nil
}
