package attachmentservice

import (
	"backend/pkg/s3file"
	"context"
)

const (
	imageBucket = "image"
	fileBucket  = "file"
)

type Repository interface {
	Put(ctx context.Context, key, bucket string, file *s3file.FilePut) error
	Get(ctx context.Context, key, bucket string) (*s3file.FileGet, error)
	Head(ctx context.Context, key, bucket string) (s3file.MetaFile, error)
}

type Service struct {
	repo Repository
}

func NewService(repo Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) PutImage(ctx context.Context, key string, file *s3file.FilePut) error {
	return s.repo.Put(ctx, key, imageBucket, file)
}

func (s *Service) GetImage(ctx context.Context, key string) (*s3file.FileGet, error) {
	return s.repo.Get(ctx, key, imageBucket)
}

func (s *Service) HeadImage(ctx context.Context, key string) (s3file.MetaFile, error) {
	return s.repo.Head(ctx, key, imageBucket)
}
