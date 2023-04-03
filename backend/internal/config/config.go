package config

import (
	"sync"
	"time"

	"github.com/caarlos0/env/v7"
)

type Config struct {
	Postgres string `env:"Postgres" envDefault:"postgresql://admin:admin@0.0.0.0:5432/root"`
	App      struct {
		Port              string        `env:"APP_PORT" envDefault:"3000"`
		Address           string        `env:"APP_ADDRESS" envDefault:"0.0.0.0"`
		Domain            string        `env:"APP_DOMAIN" envDefault:"localhost"`
		Debug             bool          `env:"APP_DEBUG" envDefault:"true"`
		ReadTimeout       time.Duration `env:"APP_READ_TIMEOUT" envDefault:"10s"`
		ReadHeaderTimeout time.Duration `env:"APP_READ_HEADER_TIMEOUT" envDefault:"10s"`
		WriteTimeout      time.Duration `env:"APP_WRITE_TIMEOUT" envDefault:"30s"`
		IdleTimeout       time.Duration `env:"APP_IDLE_TIMEOUT" envDefault:"2m"`
	}
	JWT struct {
		Private    string        `env:"JWT_PRIVATE" envDefault:"private"`
		TTLAccess  time.Duration `env:"JWT_TTL_ACCESS" envDefault:"1h"`
		TTLRefresh time.Duration `env:"JWT_TTL_REFRESH" envDefault:"30d"`
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
