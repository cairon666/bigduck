package validate

// TestPointer - testing for optional field(like ref)
func TestPointer[T any](param *T, f func(T) *Field) *Field {
	if param != nil {
		return f(*param)
	}

	return nil
}
