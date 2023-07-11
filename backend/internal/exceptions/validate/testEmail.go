package validate

func TestEmail(email string) *Field {
	if ok := regexpEmail.MatchString(email); !ok {
		return FieldBadFormat
	}

	return nil
}
