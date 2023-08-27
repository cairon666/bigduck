package config

import (
	"sync"
	"time"

	"github.com/caarlos0/env/v7"
)

type Config struct {
	Postgres string `env:"POSTGRESQL_URL" envDefault:"postgresql://admin:admin@0.0.0.0:6432/root"`
	HTTP     struct {
		Port              string        `env:"HTTP_PORT"                envDefault:"3000"`
		Address           string        `env:"HTTP_ADDRESS"             envDefault:"0.0.0.0"`
		Domain            string        `env:"HTTP_DOMAIN"              envDefault:"localhost"`
		ReadTimeout       time.Duration `env:"HTTP_READ_TIMEOUT"        envDefault:"10s"`
		ReadHeaderTimeout time.Duration `env:"HTTP_READ_HEADER_TIMEOUT" envDefault:"10s"`
		WriteTimeout      time.Duration `env:"HTTP_WRITE_TIMEOUT"       envDefault:"30s"`
		IdleTimeout       time.Duration `env:"HTTP_IDLE_TIMEOUT"        envDefault:"2m"`

		CORS struct {
			// AllowedOrigins is a list of origins a cross-domain request can be executed from.
			AllowedOrigin string `env:"CORS_ALLOWED_ORIGIN" envDefault:"*"`
			// AllowedMethods is a list of methods the client is allowed to use with
			// cross-domain requests.
			AllowedMethod string `env:"CORS_ALLOWED_METHOD" envDefault:"*"`
			// AllowedHeaders is list of non-simple headers the client is allowed to use with
			// cross-domain requests.
			AllowedHeaders string `env:"CORS_ALLOWED_HEADERS" envDefault:"*"`
			// AllowCredentials indicates whether the request can include user credentials like
			// cookies, HTTP authentication or client side SSL certificates.s
			AllowCredentials string `env:"CORS_ALLOWED_CREDENTIALS" envDefault:"true"`
			// ExposedHeaders indicates which headers are safe to expose to the API of a CORS
			// API specification
			ExposeHeaders string `env:"CORS_EXPOSE_HEADERS" envDefault:"*"`
			// MaxAge indicates how long (in seconds) the results of a preflight request
			// can be cached
			MaxAge string `env:"CORS_MAX_AGE" envDefault:"600"`
		}
	}
	App struct {
		Debug bool `env:"APP_DEBUG" envDefault:"true"`
	}
	JWT struct {
		Private    string        `env:"JWT_PRIVATE"     envDefault:"private"`
		TTLAccess  time.Duration `env:"JWT_TTL_ACCESS"  envDefault:"1h"`
		TTLRefresh time.Duration `env:"JWT_TTL_REFRESH" envDefault:"720h"`
	}
	// S3 struct {
	//	ConfigPath    string
	//	Endpoint      string
	//	SigningRegion string
	//	PartitionID   string
	//}
	Redis struct {
		URL string `env:"REDIS_URL" envDefault:"redis://admin:admin@0.0.0.0:6379/0"`
	}
	Trace struct {
		TraceGRPCAddr  string `env:"TRACE_GRPC_ADDR"       envDefault:"0.0.0.0:4317"`
		MetricGRPCAddr string `env:"METRIC_GRPC_ADDR"      envDefault:"0.0.0.0:12345"`
		ServiceID      string `env:"TRACE_SERVICE_ID"      envDefault:"627cc493-f310-47de-96bd-71410b7dec09"`
		ServiceName    string `env:"TRACE_SERVICE_NAME"    envDefault:"backend_service"`
		ServiceVersion string `env:"TRACE_SERVICE_VERSION" envDefault:"1.0.0"`
		EnvName        string `env:"TRACE_ENV_NAME"        envDefault:"develop"`
	}
	NATS struct {
		URL string `env:"NATS_URL" envDefault:"nats://0.0.0.0:4222"`
	}
	AWS struct {
		Region          string `env:"AWS_REGION"            envDefault:"us-east-1"`
		AccessKeyID     string `env:"AWS_ACCESS_KEY_ID"     envDefault:"minioadmin"`
		SecretAccessKey string `env:"AWS_SECRET_ACCESS_KEY" envDefault:"minioadmin"`
		Endpoint        string `env:"AWS_ENDPOINT"          envDefault:"http://localhost:9000"`
	}
}

var (
	conf Config
	err  error
	once sync.Once
)

func NewConfig() (*Config, error) {
	once.Do(func() {
		err = env.Parse(&conf)
	})

	return &conf, err
}
