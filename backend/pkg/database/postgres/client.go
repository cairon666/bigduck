package postgres

import (
	"authService/pkg/logger"
	"context"
	"github.com/jackc/pgx/v5"
	"time"
)

type Client interface {
	Conn() *pgx.Conn
	Query(ctx context.Context, sql string, args ...any) (pgx.Rows, error)
}

type postgresClient struct {
	conn *pgx.Conn
	log  logger.Logger
}

func NewPostgresClient(log logger.Logger, url string) (Client, error) {
	ctx := context.Background()
	conn, err := pgx.Connect(ctx, url)
	if err != nil {
		return nil, err
	}
	return &postgresClient{
		conn: conn,
		log:  log,
	}, nil
}

func (client *postgresClient) Conn() *pgx.Conn {
	return client.conn
}

func (client *postgresClient) Query(ctx context.Context, sql string, args ...any) (pgx.Rows, error) {
	client.log.Info("query",
		logger.String("sql", sql),
		logger.Any("args", args),
		logger.Time("time", time.Now()),
	)
	return client.conn.Query(ctx, sql, args...)
}
