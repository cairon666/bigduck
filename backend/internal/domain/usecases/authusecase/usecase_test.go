package authusecase

import (
	"testing"
)

type MockProps struct {
	UserService                *MockUserService
	MailService                *MockMailService
	RecoverPasswordCodeService *MockRecoverPasswordCodeService
	ConfirmEmailCodeService    *MockConfirmEmailCodeService
	CredentialService          *MockCredentialService
}

// NewMockAuthUsecase - creat new mocking usecase for testing
func NewMockAuthUsecase(t *testing.T) (*Usecase, MockProps) {
	t.Helper()

	mockProps := MockProps{
		UserService:                NewMockUserService(t),
		MailService:                NewMockMailService(t),
		RecoverPasswordCodeService: NewMockRecoverPasswordCodeService(t),
		ConfirmEmailCodeService:    NewMockConfirmEmailCodeService(t),
		CredentialService:          NewMockCredentialService(t),
	}

	usecase := NewAuthUsecase(Props{
		UserService:                mockProps.UserService,
		MailService:                mockProps.MailService,
		RecoverPasswordCodeService: mockProps.RecoverPasswordCodeService,
		ConfirmEmailCodeService:    mockProps.ConfirmEmailCodeService,
		CredentialService:          mockProps.CredentialService,
	})

	return usecase, mockProps
}
