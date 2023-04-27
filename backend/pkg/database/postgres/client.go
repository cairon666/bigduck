package postgres

import (
	"context"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
	"github.com/jackc/pgx/v5/pgxpool"
)

type PgxPool interface {
	Begin(context.Context) (pgx.Tx, error)
	BeginTx(ctx context.Context, txOptions pgx.TxOptions) (pgx.Tx, error)
	Exec(context.Context, string, ...interface{}) (pgconn.CommandTag, error)
	Query(context.Context, string, ...interface{}) (pgx.Rows, error)
	QueryRow(context.Context, string, ...interface{}) pgx.Row
	Ping(context.Context) error
}

func NewPostgresClient(url string, opts ...Option) (PgxPool, error) {
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
