package kvstorage

import (
	"context"
	"encoding/json"
	"errors"
	"time"

	"backend/internal/exceptions"
	"backend/pkg/keyer"
	"backend/pkg/tracing"
	"github.com/redis/go-redis/v9"
)

type Store[T keyer.Keyer] struct {
	rdb *redis.Client
}

func NewKVStorage[T keyer.Keyer](rdb *redis.Client) *Store[T] {
	return &Store[T]{rdb: rdb}
}

func (r Store[T]) Set(ctx context.Context, k T, expiration time.Duration) error {
	ctx, span := tracing.Start(ctx, "kvstorage.Set")
	defer span.End()

	b, err := json.Marshal(k)
	if err != nil {
		return err
	}

	if err = r.rdb.Set(ctx, k.Key(), b, expiration).Err(); err != nil {
		return err
	}

	return nil
}

func (r Store[T]) Get(ctx context.Context, key string) (T, error) {
	ctx, span := tracing.Start(ctx, "kvstorage.Get")
	defer span.End()

	var t T

	b, err := r.rdb.Get(ctx, key).Bytes()
	if err != nil {
		if errors.Is(err, redis.Nil) {
			return t, exceptions.ErrNotFound
		}

		return t, err
	}

	if err = json.Unmarshal(b, &t); err != nil {
		return t, err
	}

	return t, nil
}
