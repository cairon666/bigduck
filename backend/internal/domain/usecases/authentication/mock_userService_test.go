package authentication

import (
	"authService/internal/domain/exceptions"
	"authService/internal/domain/models"
	"authService/pkg/beda"
	"context"
	"sync"
)

type mockUserService struct {
	mu sync.Mutex
	db []models.User
}

func NewMockUserService() UserService {
	return &mockUserService{}
}

func (m *mockUserService) GetById(ctx context.Context, id string) (models.User, error) {
	m.mu.Lock()
	for _, v := range m.db {
		if v.IdUser == id {
			return v, nil
		}
	}
	m.mu.Unlock()

	return models.User{}, beda.New(exceptions.ErrorNotFound, nil)
}

func (m *mockUserService) GetByEmail(ctx context.Context, email string) (models.User, error) {
	m.mu.Lock()
	for _, v := range m.db {
		if v.Email == email {
			return v, nil
		}
	}
	m.mu.Unlock()

	return models.User{}, beda.New(exceptions.ErrorNotFound, nil)
}

func (m *mockUserService) Create(ctx context.Context, user models.User) error {
	m.mu.Lock()
	m.db = append(m.db, user)
	m.mu.Unlock()
	return nil
}
