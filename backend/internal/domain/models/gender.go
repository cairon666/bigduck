package models

import (
	"backend/internal/exceptions"
)

type Gender string

var (
	GenderMale   Gender = "male"
	GenderFemale Gender = "female"
)

func ParseGender(g string) (Gender, error) {
	switch Gender(g) {
	case GenderMale:
		return GenderMale, nil
	case GenderFemale:
		return GenderFemale, nil
	default:
		return "", exceptions.ErrGenderNotFound
	}
}

func (g Gender) ToString() string {
	return string(g)
}
