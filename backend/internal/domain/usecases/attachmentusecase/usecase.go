package attachmentusecase

import (
	"backend/pkg/s3file"
	"context"
)

type AttachmentService interface {
	PutImage(ctx context.Context, key string, file *s3file.FilePut) error
	GetImage(ctx context.Context, key string) (*s3file.FileGet, error)
	HeadImage(ctx context.Context, key string) (s3file.MetaFile, error)
}

type Usecase struct {
	attachmentService AttachmentService
}

func NewUsecase(attachmentService AttachmentService) *Usecase {
	return &Usecase{
		attachmentService: attachmentService,
	}
}
