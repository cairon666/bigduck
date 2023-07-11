package main

import (
	"backend/internal/config"
	"backend/pkg/tracing"
	"go.opentelemetry.io/otel/sdk/resource"
	"go.uber.org/dig"
)

func InvokeTracing(c *dig.Container) {
	panicIfError(c.Provide(func(conf *config.Config) *resource.Resource {
		return tracing.NewResource(tracing.Config{
			ServiceID:      conf.Trace.ServiceID,
			ServiceName:    conf.Trace.ServiceName,
			ServiceVersion: conf.Trace.ServiceVersion,
			EnvName:        conf.Trace.EnvName,
		})
	}))

	// tracer invoke
	panicIfError(c.Invoke(func(conf *config.Config, rsr *resource.Resource) error {
		_, err := tracing.NewTracer(conf.Trace.TraceGRPCAddr, rsr)
		return err
	}))

	// metrics invoke
	panicIfError(c.Invoke(func(conf *config.Config, rsr *resource.Resource) error {
		_, err := tracing.NewMetric(conf.Trace.MetricGRPCAddr, rsr)
		return err
	}))
}
