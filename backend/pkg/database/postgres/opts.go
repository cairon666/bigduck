package postgres

import (
	"context"

	"backend/pkg/logger"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type (
	Option func(c *pgxpool.Config)
	tracer struct {
		l logger.Logger
	}
)

func (t *tracer) TraceQueryStart(ctx context.Context, _ *pgx.Conn, data pgx.TraceQueryStartData) context.Context {
	t.l.Info("TraceQueryStart", logger.String("SQL", data.SQL), logger.Any("args", data.Args))
	return ctx
}

func (t *tracer) TraceQueryEnd(_ context.Context, _ *pgx.Conn, data pgx.TraceQueryEndData) {
	t.l.Info("TraceQueryEnd", logger.NamedError("err", data.Err), logger.String("CommandTag", data.CommandTag.String()))
}

func WithLogger(l logger.Logger) Option {
	return func(c *pgxpool.Config) {
		tr := tracer{l: l}
		c.ConnConfig.Tracer = &tr
	}
}
