package logger

import (
	"os"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

type Logger interface {
	Log(lvl Level, msg string, fields ...Field)
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

type Level int

const (
	DebugLevel Level = iota
	InfoLevel
	WarnLevel
	ErrorLevel
	PanicLevel
	FatalLevel
)

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
