package postgres

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
)

func NewPostgresClient(url string, opts ...Option) (*pgxpool.Pool, error) {
	ctx := context.Background()

	pgxconf, err := pgxpool.ParseConfig(url)
	if err != nil {
		return nil, err
	}

	for _, opt := range opts {
		opt(pgxconf)
	}

	conn, err := pgxpool.NewWithConfig(ctx, pgxconf)
	if err != nil {
		return nil, err
	}

	return conn, nil
}
