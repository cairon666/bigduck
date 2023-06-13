package config

import (
	"sync"
	"time"

	"github.com/caarlos0/env/v7"
)

type Config struct {
	Postgres string `env:"POSTGRESQL_URL" envDefault:"postgresql://admin:admin@0.0.0.0:5432/root"`
	HTTP     struct {
		Port              string        `env:"APP_PORT"                envDefault:"3000"`
		Address           string        `env:"APP_ADDRESS"             envDefault:"0.0.0.0"`
		Domain            string        `env:"APP_DOMAIN"              envDefault:"localhost"`
		ReadTimeout       time.Duration `env:"APP_READ_TIMEOUT"        envDefault:"10s"`
		ReadHeaderTimeout time.Duration `env:"APP_READ_HEADER_TIMEOUT" envDefault:"10s"`
		WriteTimeout      time.Duration `env:"APP_WRITE_TIMEOUT"       envDefault:"30s"`
		IdleTimeout       time.Duration `env:"APP_IDLE_TIMEOUT"        envDefault:"2m"`

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
