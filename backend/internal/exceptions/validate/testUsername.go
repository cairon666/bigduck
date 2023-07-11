package validate

var (
	MilLenUserName = 3
	MaxLenUserName = 10
)

func TestUsername(username string) *Field {
	if len(username) < MilLenUserName {
		return FieldShort
	}

	if len(username) > MaxLenUserName {
		return FieldLong
	}

	if !regexpNotLettersAndSpace.MatchString(username) {
		return FieldBadFormat
	}

	return nil
}
