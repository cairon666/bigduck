package tracing

import (
	"context"
	"fmt"
	"time"

	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracegrpc"
	"go.opentelemetry.io/otel/propagation"
	"go.opentelemetry.io/otel/sdk/resource"
	sdk_trace "go.opentelemetry.io/otel/sdk/trace"
	"go.opentelemetry.io/otel/trace"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func NewTracer(grpcAddr string, rsr *resource.Resource) (*sdk_trace.TracerProvider, error) {
	ctx := context.Background()

	// If the OpenTelemetry Collector is running on a local cluster (minikube or
	// microk8s), it should be accessible through the NodePort service at the
	// `localhost:30080` endpoint. Otherwise, replace `localhost` with the
	// endpoint of your cluster. If you run the app inside k8s, then you can
	// probably connect directly to the service through dns.
	ctx, cancel := context.WithTimeout(ctx, time.Second)
	defer cancel()

	conn, err := grpc.DialContext(ctx, grpcAddr,
		// Note the use of insecure transport here. TLS is recommended in production.
		grpc.WithTransportCredentials(insecure.NewCredentials()),
		grpc.WithBlock(),
	)
	if err != nil {
		return nil, fmt.Errorf("failed to create gRPC connection to collector %s: %w", grpcAddr, err)
	}

	// Set up a trace exporter
	traceExporter, err := otlptracegrpc.New(ctx, otlptracegrpc.WithGRPCConn(conn))
	if err != nil {
		return nil, fmt.Errorf("failed to create trace exporter: %w", err)
	}

	// Register the trace exporter with a TracerProvider, using a batch
	// span processor to aggregate spans before export.
	bsp := sdk_trace.NewBatchSpanProcessor(traceExporter)

	traceProvider := sdk_trace.NewTracerProvider(
		sdk_trace.WithResource(rsr),
		sdk_trace.WithSpanProcessor(bsp),
	)

	otel.SetTracerProvider(traceProvider)
	otel.SetTextMapPropagator(propagation.TraceContext{})

	return traceProvider, nil
}

func SpanEvent(ctx context.Context, name string) {
	span := trace.SpanFromContext(ctx)
	if !span.IsRecording() {
		return
	}

	span.AddEvent(name)
}

func Start(ctx context.Context, name string, options ...trace.SpanStartOption) (context.Context, trace.Span) {
	t := otel.Tracer(name)

	ctx, span := t.Start(ctx, name, options...)

	return ctx, span
}

func Continue(ctx context.Context, name string, options ...trace.SpanStartOption) (context.Context, trace.Span) {
	span := trace.SpanFromContext(ctx)
	if !span.IsRecording() {
		return ctx, span
	}

	return Start(ctx, name, options...)
}
