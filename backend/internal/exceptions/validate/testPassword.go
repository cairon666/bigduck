package validate

const (
	MinLenPassword = 8
)

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
