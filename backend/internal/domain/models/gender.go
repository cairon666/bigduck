package models

type Gender string

var (
	MALE   Gender = "MALE"
	FEMALE Gender = "FEMALE"
)

func ParseGender(g *string) *Gender {
	if g == nil {
		return nil
	}

	switch Gender(*g) {
	case MALE:
		return &MALE
	case FEMALE:
		return &FEMALE
	default:
		return nil
	}
}

func NewMaleGender() *Gender {
	return &MALE
}

func NewFemaleGender() *Gender {
	return &FEMALE
}
