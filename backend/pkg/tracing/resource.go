package tracing

import (
	"go.opentelemetry.io/otel/sdk/resource"
	semconv "go.opentelemetry.io/otel/semconv/v1.19.0"
)

type Config struct {
	ServiceID      string
	ServiceName    string
	ServiceVersion string
	EnvName        string
}

func NewResource(conf Config) *resource.Resource {
	return resource.NewWithAttributes(
		semconv.SchemaURL,
		semconv.ServiceNameKey.String(conf.ServiceName),
		semconv.DeploymentEnvironmentKey.String(conf.EnvName),
		semconv.ServiceVersionKey.String(conf.ServiceVersion),
		semconv.ServiceInstanceIDKey.String(conf.ServiceID),
	)
}
