package registerStorage

import (
	"authService/internal/domain/exceptions"
	"authService/internal/domain/models"
	"authService/pkg/beda"
	"authService/pkg/logger"
	"context"
	"github.com/google/uuid"
	"sync"
)

type storage struct {
	log logger.Logger
	mu  sync.Mutex
	db  map[string]models.Register
}

func NewRegisterStorage(log logger.Logger) *storage {
	return &storage{
		log: log,
		db:  make(map[string]models.Register),
	}
}

func (s *storage) CreateSession(ctx context.Context, data models.Register) (IdSession string, error error) {
	genUuid, err := uuid.NewUUID()
	if err != nil {
		s.log.Error("CreateSession NewUUID", logger.Error(err))
		return "", err
	}

	id := genUuid.String()

	s.mu.Lock()
	s.db[id] = data
	s.mu.Unlock()

	return id, nil
}

func (s *storage) GetSession(ctx context.Context, IdSession string) (data models.Register, err error) {
	s.mu.Lock()
	data, ok := s.db[IdSession]
	s.mu.Unlock()
	if !ok {
		return models.Register{}, beda.New(exceptions.ErrorNotFound, nil)
	}

	return data, nil
}

func (s *storage) SetSession(ctx context.Context, IdSession string, data models.Register) error {
	s.mu.Lock()
	s.db[IdSession] = data
	s.mu.Unlock()
	return nil
}

func (s *storage) DeleteSession(ctx context.Context, IdSession string) error {
	s.mu.Lock()
	delete(s.db, IdSession)
	s.mu.Unlock()
	return nil
}
