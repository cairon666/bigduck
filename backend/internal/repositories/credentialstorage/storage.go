package credentialstorage

import (
	"github.com/jackc/pgx/v5/pgxpool"
)

type storage struct {
	client *pgxpool.Pool
}

func NewCredentialStorage(client *pgxpool.Pool) *storage {
	return &storage{
		client: client,
	}
}
