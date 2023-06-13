package userusecase

import (
	"testing"
)

type MockProps struct {
	UserService *MockUserService
}

func NewMockUserUsecase(t *testing.T) (*Usecase, MockProps) {
	t.Helper()

	mockProps := MockProps{
		UserService: NewMockUserService(t),
	}

	return NewUserUsecase(Props{
		UserService: mockProps.UserService,
	}), mockProps
}
