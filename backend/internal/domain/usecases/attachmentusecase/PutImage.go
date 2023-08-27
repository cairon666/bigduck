package attachmentusecase

import (
	"backend/internal/exceptions"
	"backend/pkg/s3file"
	"context"
	"path"

	"github.com/google/uuid"
	"github.com/samber/lo"
)

const (
	MaxImageSize = 5 * 1024 * 1024 // 5MB
)

var (
	possibleExtension = []string{".png", ".jpg", ".jpeg", ".gif"}
)

type PutImageRequest struct {
	File *s3file.FilePut
}

type PutImageResponse struct {
	Filename string
}

func NewPutImageRequest(f *s3file.FilePut) PutImageRequest {
	return PutImageRequest{
		File: f,
	}
}

func (u *Usecase) PutImage(ctx context.Context, dto PutImageRequest) (PutImageResponse, error) {
	// check what image size in correct range
	if dto.File.MetaFile.Size > MaxImageSize {
		return PutImageResponse{}, exceptions.ErrLargeImage
	}

	// check file2 extension
	ext := path.Ext(dto.File.MetaFile.Filename)
	_, isFind := lo.Find(possibleExtension, func(item string) bool {
		return item == ext
	})
	if !isFind {
		return PutImageResponse{}, exceptions.ErrBadImageExtension
	}

	key := uuid.New().String() + ext

	if err := u.attachmentService.PutImage(ctx, key, dto.File); err != nil {
		return PutImageResponse{}, err
	}

	return PutImageResponse{Filename: key}, nil
}
