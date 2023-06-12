package authcontroller

import "testing"

type MockParams struct {
	AuthUsecase *MockAuthUsecase
	HTTPHelper  *MockHTTPHelper
	AuthHelper  *MockAuthHelper
}

func NewMockController(t *testing.T) (*controller, MockParams) {
	t.Helper()

	mockParams := MockParams{
		AuthUsecase: NewMockAuthUsecase(t),
		HTTPHelper:  NewMockHTTPHelper(t),
		AuthHelper:  NewMockAuthHelper(t),
	}

	params := Params{
		AuthUsecase: mockParams.AuthUsecase,
		HTTPHelper:  mockParams.HTTPHelper,
		AuthHelper:  mockParams.AuthHelper,
	}

	return NewAuthController(params), mockParams
}
