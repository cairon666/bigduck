package kvstorage

import (
	"context"
	"sync"

	"backend/internal/domain/exceptions"
)

type storage struct {
	mu    sync.Mutex
	store map[string]map[string]string
}

func NewKVStorage() *storage {
	return &storage{
		store: make(map[string]map[string]string),
	}
}

func (s *storage) Get(ctx context.Context, key string) (map[string]string, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	data, ok := s.store[key]
	if !ok {
		return nil, exceptions.ErrNotFound
	}

	return data, nil
}

func (s *storage) Set(ctx context.Context, key string, data map[string]string) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	s.store[key] = data

	return nil
}
