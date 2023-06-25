package tracing

import (
	"context"

	"go.opentelemetry.io/otel/attribute"
	"go.opentelemetry.io/otel/codes"
	"go.opentelemetry.io/otel/trace"
)

type Attributed interface {
	Attributes() []attribute.KeyValue
}

func TraceVal(ctx context.Context, name string, val string) {
	span := trace.SpanFromContext(ctx)
	if !span.IsRecording() {
		return
	}

	span.SetAttributes(attribute.String(name, val))
}

func Error(ctx context.Context, err error) {
	if err == nil {
		return
	}

	if span := trace.SpanFromContext(ctx); span.IsRecording() {
		span.RecordError(err)
		span.SetStatus(codes.Error, err.Error())
	}
}

func ErrorWithName(ctx context.Context, name string, err error) {
	if err == nil {
		return
	}

	if span := trace.SpanFromContext(ctx); span.IsRecording() {
		span.RecordError(err)
		span.SetName(name)
		span.SetStatus(codes.Error, err.Error())
	}
}
