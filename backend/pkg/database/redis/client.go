package redis

import (
	"github.com/redis/go-redis/v9"
)

type Client interface {
	Client() *redis.Client
}

type redisClient struct {
	client *redis.Client
}

func NewRedisClient(url string) (Client, error) {
	opts, err := redis.ParseURL(url)
	if err != nil {
		return nil, err
	}
	client := redis.NewClient(opts)

	return &redisClient{
		client: client,
	}, nil
}

func (client *redisClient) Client() *redis.Client {
	return client.client
}
