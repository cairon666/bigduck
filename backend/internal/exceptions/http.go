package exceptions

type HTTPError struct {
	Message string `json:"message"`
	code    int
}

func NewHTTPError(err string, code int) *HTTPError {
	return &HTTPError{
		Message: err,
		code:    code,
	}
}

func (e *HTTPError) GetCode() int {
	return e.code
}

func (e *HTTPError) GetData() any {
	return e
}

func (e *HTTPError) Error() string {
	return e.Message
}
