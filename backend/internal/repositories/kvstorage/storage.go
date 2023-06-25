package kvstorage

import (
	"context"
	"encoding/json"
	"errors"
	"time"

	"backend/internal/domain/models"
	"backend/internal/exceptions"
	"backend/pkg/tracing"
	"github.com/redis/go-redis/v9"
)

type Store[T models.Keyer] struct {
	rdb *redis.Client
}

func NewKVStorage[T models.Keyer](rdb *redis.Client) *Store[T] {
	return &Store[T]{rdb: rdb}
}

func (r Store[T]) Set(ctx context.Context, k T, expiration time.Duration) error {
	ctx, span := tracing.Start(ctx, "kvstorage.Set")
	defer span.End()

	b, err := json.Marshal(k)
	if err != nil {
		err = exceptions.NewInternalErr("kvstorage.Set.Marshal", err)
		tracing.Error(ctx, err)

		return err
	}

	err = r.rdb.Set(ctx, k.Key(), b, expiration).Err()
	if err != nil {
		err = exceptions.NewInternalErr("kvstorage.Set.Set", err)
		tracing.Error(ctx, err)

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

		err = exceptions.NewInternalErr("kvstorage.Get.Get", err)
		tracing.Error(ctx, err)

		return t, err
	}

	err = json.Unmarshal(b, &t)
	if err != nil {
		err = exceptions.NewInternalErr("kvstorage.Get.Unmarshal", err)
		tracing.Error(ctx, err)

		return t, err
	}

	return t, nil
}
