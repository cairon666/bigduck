package postgres

import (
	"context"
	"time"

	"backend/pkg/logger"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Client interface {
	Query(ctx context.Context, sql string, args ...any) (pgx.Rows, error)
	Exec(ctx context.Context, sql string, args ...any) (pgconn.CommandTag, error)
}

type postgresClient struct {
	conn *pgxpool.Pool
	log  logger.Logger
}

func NewPostgresClient(log logger.Logger, url string) (Client, error) {
	ctx := context.Background()

	pgxconf, err := pgxpool.ParseConfig(url)
	if err != nil {
		return nil, err
	}

	conn, err := pgxpool.NewWithConfig(ctx, pgxconf)
	if err != nil {
		return nil, err
	}

	return &postgresClient{
		conn: conn,
		log:  log,
	}, nil
}

func (client *postgresClient) Query(ctx context.Context, sql string, args ...any) (pgx.Rows, error) {
	client.log.Info("query",
		logger.String("sql", sql),
		logger.Any("args", args),
		logger.Time("time", time.Now()),
	)

	return client.conn.Query(ctx, sql, args...)
}

func (client *postgresClient) Exec(ctx context.Context, sql string, args ...any) (pgconn.CommandTag, error) {
	client.log.Info("exec",
		logger.String("sql", sql),
		logger.Any("args", args),
		logger.Time("time", time.Now()),
	)

	return client.conn.Exec(ctx, sql, args...)
}
