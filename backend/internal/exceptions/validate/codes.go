package validate

const (
	CodeNone Code = iota
	CodeShort
	CodeLong
	CodeBadFormat
	CodeSpecialCharacter
	CodeOneDigital
	CodeOneUpperCharacter
	CodeOneLowerCharacter
	CodeUnknownType
	CodeFromFeature
)
