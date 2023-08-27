package postgres

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/pkg/errors"
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

	if err := conn.Ping(ctx); err != nil {
		return nil, errors.Wrap(err, "ping database error")
	}

	return conn, nil
}
