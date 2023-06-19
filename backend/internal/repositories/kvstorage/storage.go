package kvstorage

import (
	"context"
	"time"

	"backend/pkg/tracing"
	"github.com/redis/go-redis/v9"
)

type storage struct {
	client *redis.Client
	ttl    time.Duration
}

func NewKVStorage(client *redis.Client, ttl time.Duration) *storage {
	return &storage{
		client: client,
		ttl:    ttl,
	}
}

func (s *storage) Get(ctx context.Context, key string) (string, error) {
	ctx, span := tracing.Start(ctx, "kvstorage.Get")
	defer span.End()

	data, err := s.client.Get(ctx, key).Result()
	if err != nil {
		return "", err
	}

	return data, nil
}

func (s *storage) Set(ctx context.Context, key string, data string) error {
	ctx, span := tracing.Start(ctx, "kvstorage.Set")
	defer span.End()

	cmd := s.client.Set(ctx, key, data, s.ttl)

	if cmd.Err() != nil {
		return cmd.Err()
	}

	return nil
}

func (s *storage) Del(ctx context.Context, keys ...string) error {
	ctx, span := tracing.Start(ctx, "kvstorage.Del")
	defer span.End()

	cmd := s.client.Del(ctx, keys...)
	if cmd.Err() != nil {
		return cmd.Err()
	}

	return nil
}
