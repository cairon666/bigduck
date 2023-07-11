package validate

const (
	MilLenName = 3
	MaxLenName = 15
)

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
