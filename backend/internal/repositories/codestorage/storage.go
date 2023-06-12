package codestorage

import (
	"context"
	"sync"

	"backend/internal/domain/models"
	"backend/internal/exceptions"
)

type storage struct {
	mu    sync.Mutex
	store map[string]models.RecoverPassword
}

func NewCodeStorage() *storage {
	return &storage{
		store: make(map[string]models.RecoverPassword),
	}
}

func (s *storage) GetCodeByEmail(ctx context.Context, email string) (models.RecoverPassword, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	data, ok := s.store[email]
	if !ok {
		return models.RecoverPassword{}, exceptions.ErrNotFound
	}

	return data, nil
}

func (s *storage) SetCode(ctx context.Context, data models.RecoverPassword) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	s.store[data.Email] = data

	return nil
}
