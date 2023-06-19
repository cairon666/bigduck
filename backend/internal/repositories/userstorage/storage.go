package userstorage

import (
	"github.com/jackc/pgx/v5/pgxpool"
)

type UserStorage struct {
	client *pgxpool.Pool
}

func NewUserStorage(client *pgxpool.Pool) *UserStorage {
	return &UserStorage{
		client: client,
	}
}
