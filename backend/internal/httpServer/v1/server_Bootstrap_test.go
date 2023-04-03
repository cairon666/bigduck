package v1

import (
	"backend/internal/config"
	"backend/pkg/logger"
	"testing"
)

func Bootstrap(t *testing.T) (params ServerParams, server *server) {
	log, err := logger.NewDev()
	if err != nil {
		t.Fatal(err)
	}
	conf, err := config.NewConfig()
	if err != nil {
		t.Fatal(err)
	}

	params = ServerParams{
		UserUsecase: NewMockUserUsecase(t),
		AuthUsecase: NewMockAuthUsecase(t),
	}

	server = NewServer(log, conf, params)
	return
}
