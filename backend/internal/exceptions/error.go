package exceptions

type Error interface {
	error
	GetCode() int
	GetData() any
}
