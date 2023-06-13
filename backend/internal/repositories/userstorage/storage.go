package userstorage

import (
	"backend/pkg/database/postgres"
)

type UserStorage struct {
	client postgres.PgxPool
}

func NewUserStorage(client postgres.PgxPool) *UserStorage {
	return &UserStorage{
		client: client,
	}
}
