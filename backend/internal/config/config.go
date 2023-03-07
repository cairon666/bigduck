package config

import (
	"github.com/caarlos0/env/v7"
	"sync"
	"time"
)

type Config struct {
	POSTGRESQL_URL string `env:"POSTGRESQL_URL" envDefault:"postgresql://admin:admin@localhost:5432/root"`
	APP            struct {
		PORT    string `env:"APP_PORT" envDefault:"3000"`
		ADDRESS string `env:"APP_ADDRESS" envDefault:"0.0.0.0"`
		DEBUG   bool   `env:"APP_DEBUG" envDefault:"true"`
	}
	REDIS struct {
		REGISTER string `env:"REDIS_URL" envDefault:"redis://admin:admin@localhost:6379/0"`
	}
	AUTHORIZATION struct {
		TTL_ACCESS  time.Duration
		TTL_REFRESH time.Duration
		PRIVATE     string
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
