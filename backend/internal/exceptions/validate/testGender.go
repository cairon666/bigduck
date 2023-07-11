package validate

import "backend/internal/domain/models"

func TestGender(gender string) *Field {
	if _, err := models.ParseGender(gender); err != nil {
		return FieldUnknownType
	}

	return nil
}
