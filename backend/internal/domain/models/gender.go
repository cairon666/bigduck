package models

import (
	"backend/internal/exceptions"
)

type Gender string

var (
	GenderMale   Gender = "MALE"
	GenderFemale Gender = "FEMALE"
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

func NewMaleGender() Gender {
	return GenderMale
}

func NewFemaleGender() Gender {
	return GenderFemale
}

func (g Gender) ToString() string {
	return string(g)
}
