package s3storage

import (
	"backend/internal/exceptions"
	"backend/pkg/s3file"
	"context"
	"errors"
	"strconv"

	"github.com/aws/aws-sdk-go/aws/awserr"
	"github.com/aws/aws-sdk-go/service/s3"
)

const (
	filenameKey = "Filename"
	sizeKey     = "Size"
)

type Storage struct {
	client *s3.S3
}

func NewStorage(client *s3.S3) *Storage {
	return &Storage{
		client: client,
	}
}

func (s *Storage) Put(ctx context.Context, key, bucket string, file *s3file.FilePut) error {
	meta := file.MetaFile.Headers
	size := strconv.Itoa(int(file.MetaFile.Size))
	meta[filenameKey] = &file.MetaFile.Filename
	meta[sizeKey] = &size

	_, err := s.client.PutObjectWithContext(ctx, &s3.PutObjectInput{
		Bucket:   &bucket,
		Key:      &key,
		Body:     file.File,
		Metadata: meta,
	})
	if err != nil {
		return err
	}

	return nil
}

func (s *Storage) Get(ctx context.Context, key, bucket string) (*s3file.FileGet, error) {
	out, err := s.client.GetObjectWithContext(ctx, &s3.GetObjectInput{
		Key:    &key,
		Bucket: &bucket,
	})
	if err != nil {
		return nil, parseS3Error(err)
	}

	meta := out.Metadata
	size, _ := strconv.Atoi(*meta[sizeKey])
	filename := *meta[filenameKey]

	delete(meta, sizeKey)
	delete(meta, filenameKey)

	metaFile := s3file.NewMetaFile(int64(size), filename, meta)
	file := s3file.NewFileGet(out.Body, metaFile)

	return file, nil
}

func (s *Storage) Head(ctx context.Context, key, bucket string) (s3file.MetaFile, error) {
	return s3file.MetaFile{}, nil
}

func parseS3Error(err error) error {
	var s3Err awserr.Error
	if errors.As(err, &s3Err) {
		if s3Err.Code() == s3.ErrCodeNoSuchKey {
			return exceptions.ErrNotFound
		}
	}

	return err
}
