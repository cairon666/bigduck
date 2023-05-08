package v1

import (
	"testing"

	"backend/internal/config"
	"backend/pkg/logger"
)

type TestingServerParams struct {
	AuthUsecase *MockAuthUsecase
	UserUsecase *MockUserUsecase
}

func ForTestingNewServer(t *testing.T) (*Server, TestingServerParams) {
	t.Helper()

	params := TestingServerParams{
		AuthUsecase: NewMockAuthUsecase(t),
		UserUsecase: NewMockUserUsecase(t),
	}

	conf, err := config.NewConfig()
	if err != nil {
		t.Fatal(err)
	}

	log, err := logger.NewDev()
	if err != nil {
		t.Fatal(err)
	}

	server := NewServer(log, conf, ServerParams{
		AuthUsecase: params.AuthUsecase,
		UserUsecase: params.UserUsecase,
	})

	return server, params
}
