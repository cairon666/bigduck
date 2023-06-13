package credentialstorage

import (
	"backend/pkg/database/postgres"
)

type storage struct {
	client postgres.PgxPool
}

func NewCredentialStorage(client postgres.PgxPool) *storage {
	return &storage{
		client: client,
	}
}
