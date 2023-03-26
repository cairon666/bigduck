package config

import (
	"github.com/caarlos0/env/v7"
	"sync"
)

type Config struct {
	POSTGRESQL_URL string `env:"POSTGRESQL_URL" envDefault:"postgresql://admin:admin@0.0.0.0:5432/root"`
	APP            struct {
		PORT    string `env:"APP_PORT" envDefault:"3000"`
		ADDRESS string `env:"APP_ADDRESS" envDefault:"0.0.0.0"`
		DOMAIN  string `env:"APP_DOMAIN" envDefault:"localhost"`
		DEBUG   bool   `env:"APP_DEBUG" envDefault:"true"`
	}
	JWT struct {
		PRIVATE string `env:"JWT_PRIVATE" envDefault:"private"`
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
