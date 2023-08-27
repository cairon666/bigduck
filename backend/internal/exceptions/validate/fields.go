package validate

var (
	FieldNone              = NewValidateField("don't have error", CodeNone)
	FieldShort             = NewValidateField("FieldShort", CodeShort)
	FieldLong              = NewValidateField("FieldLong", CodeLong)
	FieldBadFormat         = NewValidateField("FieldBadFormat", CodeBadFormat)
	FieldSpecialCharacter  = NewValidateField("FieldSpecialCharacter", CodeSpecialCharacter)
	FieldOneDigital        = NewValidateField("FieldOneDigital", CodeOneDigital)
	FieldOneUpperCharacter = NewValidateField("FieldOneUpperCharacter", CodeOneUpperCharacter)
	FieldOneLowerCharacter = NewValidateField("FieldOneLowerCharacter", CodeOneLowerCharacter)
	FieldUnknownType       = NewValidateField("FieldUnknownType", CodeUnknownType)
	FieldFromFeature       = NewValidateField("FieldFromFeature", CodeFromFeature)
)
