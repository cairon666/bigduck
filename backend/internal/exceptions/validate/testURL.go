package validate

func TestURL(url string) *Field {
	if ok := regexpURL.MatchString(url); !ok {
		return FieldBadFormat
	}

	return nil
}
