package validate

import "time"

func TestDayOfBirth(date time.Time) *Field {
	if date.After(time.Now()) {
		return FieldFromFeature
	}

	return nil
}
