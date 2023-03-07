package authentication

import (
	"authService/internal/domain/models"
	"context"
	"errors"
	"github.com/google/uuid"
	"sync"
)

type mockRegisterService struct {
	mu sync.Mutex
	ss map[string]models.Register
}

func NewMockRegisterService() RegisterService {
	return &mockRegisterService{
		ss: make(map[string]models.Register),
	}
}

func (m *mockRegisterService) CreateSession(ctx context.Context, data models.Register) (IdSession string, error error) {
	genUuid, err := uuid.NewUUID()
	if err != nil {
		return "", err
	}
	id := genUuid.String()

	m.mu.Lock()
	m.ss[id] = data
	m.mu.Unlock()

	return id, nil
}

func (m *mockRegisterService) GetSession(ctx context.Context, IdSession string) (data models.Register, err error) {
	m.mu.Lock()
	data, ok := m.ss[IdSession]
	m.mu.Unlock()

	if !ok {
		return models.Register{}, errors.New("not found")
	}

	return data, nil
}

func (m *mockRegisterService) SetSession(ctx context.Context, IdSession string, data models.Register) error {
	m.mu.Lock()
	m.ss[IdSession] = data
	m.mu.Unlock()

	return nil
}

func (m *mockRegisterService) DeleteSession(ctx context.Context, IdSession string) error {
	m.mu.Lock()
	delete(m.ss, IdSession)
	m.mu.Unlock()

	return nil
}
