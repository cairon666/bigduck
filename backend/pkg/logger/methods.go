package logger

func (l *logger) Log(lvl Level, msg string, fields ...Field) {
	switch lvl {
	case DebugLevel:
		l.Debug(msg, fields...)
	case InfoLevel:
		l.Info(msg, fields...)
	case WarnLevel:
		l.Warn(msg, fields...)
	case ErrorLevel:
		l.Error(msg, fields...)
	case PanicLevel:
		l.Panic(msg, fields...)
	case FatalLevel:
		l.Fatal(msg, fields...)
	default:
		l.Debug(msg, fields...)
	}
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
