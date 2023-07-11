package validate

import "github.com/google/uuid"

func TestUUID(id string) *Field {
	if _, err := uuid.Parse(id); err != nil {
		return FieldBadFormat
	}

	return nil
}
