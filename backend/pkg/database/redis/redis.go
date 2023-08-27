package redis

import (
	"fmt"

	"github.com/redis/go-redis/v9"
)

func NewRedisClient(url string) (*redis.Client, error) {
	urlOpt, err := redis.ParseURL(url)
	if err != nil {
		return nil, fmt.Errorf("parse url error: %w", err)
	}

	client := redis.NewClient(urlOpt)

	return client, nil
}
