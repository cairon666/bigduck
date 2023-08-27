package logger

import "github.com/aws/aws-sdk-go/aws"

type (
	s3Logger struct {
		l       Logger
		message string
		lvl     Level
	}
	OptionS3Logger func(*s3Logger)
)

func (l *s3Logger) Log(fields ...interface{}) {
	l.l.Log(l.lvl, l.message, Any("fields", fields))
}

func WithLogger(l Logger) OptionS3Logger {
	return func(logger *s3Logger) {
		logger.l = l
	}
}

func WithPrefix(prefix string) OptionS3Logger {
	return func(logger *s3Logger) {
		logger.message = prefix
	}
}

func WithLevel(lvl Level) OptionS3Logger {
	return func(logger *s3Logger) {
		logger.lvl = lvl
	}
}

func ToAWSLogger(opts ...OptionS3Logger) aws.Logger {
	logger := &s3Logger{
		l:       nil,
		lvl:     DebugLevel,
		message: "aws",
	}

	for _, opt := range opts {
		opt(logger)
	}

	if logger.l == nil {
		logger.l, _ = NewDev()
	}

	return logger
}
