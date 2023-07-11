package validate

func TestFourCode(code string) *Field {
	if ok := regexpFourCode.MatchString(code); !ok {
		return FieldBadFormat
	}

	return nil
}
