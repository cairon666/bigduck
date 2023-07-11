package logger

import (
	"os"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

type Logger interface {
	Debug(msg string, fields ...Field)
	Info(msg string, fields ...Field)
	Warn(msg string, fields ...Field)
	Error(msg string, fields ...Field)
	Panic(msg string, fields ...Field)
	Fatal(msg string, fields ...Field)
	Sync() error
	ErrorDetails(method, operation string, cause error)
}

type logger struct {
	log *zap.Logger
}

// NewDev - default console logger for dev
func NewDev() (Logger, error) {
	cfgFile := zapcore.EncoderConfig{
		MessageKey:    "message",
		LevelKey:      "level",
		EncodeLevel:   zapcore.CapitalColorLevelEncoder,
		TimeKey:       "time",
		EncodeTime:    zapcore.ISO8601TimeEncoder,
		CallerKey:     "caller",
		EncodeCaller:  zapcore.FullCallerEncoder,
		StacktraceKey: "trace",
	}
	core := zapcore.NewCore(zapcore.NewConsoleEncoder(cfgFile), zapcore.Lock(os.Stdout), zapcore.DebugLevel)
	log := zap.New(
		core,
		zap.Development(),
		zap.AddStacktrace(zap.ErrorLevel),
	)

	return &logger{
		log: log,
	}, nil
}

func (l *logger) Debug(msg string, fields ...Field) {
	l.log.Debug(msg, fields...)
}
func (l *logger) Info(msg string, fields ...Field) {
	l.log.Info(msg, fields...)
}

func (l *logger) Warn(msg string, fields ...Field) {
	l.log.Warn(msg, fields...)
}

func (l *logger) Error(msg string, fields ...Field) {
	l.log.Error(msg, fields...)
}

func (l *logger) ErrorDetails(method, operation string, cause error) {
	l.log.Error("error",
		String("method", method),
		String("operation", operation),
		Error(cause),
	)
}

func (l *logger) Panic(msg string, fields ...Field) {
	l.log.Panic(msg, fields...)
}

func (l *logger) Fatal(msg string, fields ...Field) {
	l.log.Fatal(msg, fields...)
}

func (l *logger) Sync() error {
	return l.log.Sync()
}
