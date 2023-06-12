package authusecase

import (
	"testing"
)

type MockProps struct {
	UserService *MockUserService
	MailService *MockMailService
	CodeService *MockCodeService
}

// NewMockAuthUsecase - creat new mocking usecase for testing
func NewMockAuthUsecase(t *testing.T) (*Usecase, MockProps) {
	t.Helper()

	mockProps := MockProps{
		UserService: NewMockUserService(t),
		MailService: NewMockMailService(t),
		CodeService: NewMockCodeService(t),
	}

	usecase := NewAuthUsecase(Props{
		UserService: mockProps.UserService,
		MailService: mockProps.MailService,
		CodeService: mockProps.CodeService,
	})

	return usecase, mockProps
}
