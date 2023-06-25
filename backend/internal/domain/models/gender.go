package models

import (
	"backend/internal/exceptions"
)

type Gender string

var (
	GenderMale   Gender = "male"
	GenderFemale Gender = "female"
)

func MustParseGenderPoint(g *string) *Gender {
	if g == nil {
		return nil
	}

	gender, _ := ParseGender(*g)

	return &gender
}

func MustParseGender(g string) Gender {
	gender, _ := ParseGender(g)
	return gender
}

func ParseGender(g string) (Gender, error) {
	switch Gender(g) {
	case GenderMale:
		return GenderMale, nil
	case GenderFemale:
		return GenderFemale, nil
	default:
		return "", exceptions.ErrBadFormatGender
	}
}

func (g Gender) ToString() string {
	return string(g)
}
