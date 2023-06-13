package usercontroller

import "testing"

func NewMockController(t *testing.T) (*controller, Params) {
	t.Helper()

	params := Params{
		UserUsecase: NewMockUserUsecase(t),
		HTTPHelper:  NewMockHTTPHelper(t),
		AuthHelper:  NewMockAuthHelper(t),
	}

	return NewUserController(params), params
}
