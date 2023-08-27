package exceptions

type ForbiddenError struct {
}

func NewForbidden() *ForbiddenError {
	return &ForbiddenError{}
}

func (e *ForbiddenError) Error() string {
	return "forbidden error"
}

var (
	ErrForbidden = NewForbidden()
)
