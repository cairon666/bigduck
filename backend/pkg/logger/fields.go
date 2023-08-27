package logger

import (
	"context"
	"time"

	"backend/pkg/middleware"
	"go.uber.org/zap"
)

type Field = zap.Field

func Any(key string, value interface{}) Field {
	return zap.Any(key, value)
}

func Bool(key string, val bool) Field {
	return zap.Bool(key, val)
}

func Duration(key string, val time.Duration) Field {
	return zap.Duration(key, val)
}

func Error(err error) Field {
	return zap.Error(err)
}

func Errors(key string, errs []error) Field {
	return zap.Errors(key, errs)
}

func Int(key string, val int) Field {
	return zap.Int(key, val)
}

func Int64(key string, val int64) Field {
	return zap.Int64(key, val)
}

func NamedError(key string, err error) Field {
	return zap.NamedError(key, err)
}

func Skip() Field {
	return zap.Skip()
}

func String(key string, val string) Field {
	return zap.String(key, val)
}

func Time(key string, val time.Time) Field {
	return zap.Time(key, val)
}

func RequestIDFromContext(ctx context.Context) Field {
	return zap.String(middleware.RequestIDHeader, middleware.GetReqID(ctx))
}
