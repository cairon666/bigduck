package exceptions

type CustomError struct {
	Message string `json:"message"`
	Code    int    `json:"code"`
}

func newErr(msg string, code int) *CustomError {
	return &CustomError{
		Message: msg,
		Code:    code,
	}
}

func (e *CustomError) Error() string {
	return e.Message
}

func (e *CustomError) GetCode() int {
	return e.Code
}
