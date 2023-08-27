package models

import "errors"

type Gender string

var (
	ErrUnknownGender = errors.New("unknown gender")

	GenderMale   Gender = "male"
	GenderFemale Gender = "female"
)

func ParseGender(gender string) (Gender, error) {
	switch gender {
	case "male":
		return GenderMale, nil
	case "female":
		return GenderFemale, nil
	}

	return "", ErrUnknownGender
}

func ParsePointGender(gender *string) (Gender, error) {
	if gender == nil {
		return "", ErrUnknownGender
	}

	return ParseGender(*gender)
}

func MustParsePointGender(gender *string) *Gender {
	out, _ := ParsePointGender(gender)
	return &out
}

func (g Gender) ToString() string {
	return string(g)
}
