package attachmentusecase

import (
	"backend/pkg/s3file"
	"context"
)

type GetImageRequest struct {
	Filename string
}

func NeGetImageRequest(filename string) GetImageRequest {
	return GetImageRequest{
		Filename: filename,
	}
}

type GetImageResponse struct {
	File *s3file.FileGet
}

func (u *Usecase) GetImage(ctx context.Context, req GetImageRequest) (resp GetImageResponse, err error) {
	file, err := u.attachmentService.GetImage(ctx, req.Filename)
	if err != nil {
		return GetImageResponse{}, err
	}

	return GetImageResponse{File: file}, nil
}
