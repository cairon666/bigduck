package attachmentcontroller

import (
	"net/http"

	"backend/internal/domain/usecases/attachmentusecase"
	"backend/pkg/s3file"
)

type uploadImageResponse struct {
	Filename string `json:"filename"`
}

func (c *Controller) uploadImageHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	file, fileHeader, err := r.FormFile("image")
	if err != nil {
		c.httpHelper.HandleError(ctx, w, err)
		return
	}

	metaFile := s3file.NewMetaFile(fileHeader.Size, fileHeader.Filename, s3file.MIMEHeader2Header(fileHeader.Header))
	fDTO := s3file.NewFilePut(file, metaFile)
	dto := attachmentusecase.NewPutImageRequest(fDTO)

	res, err := c.attachmentUsecase.PutImage(ctx, dto)
	if err != nil {
		c.httpHelper.HandleError(ctx, w, err)
		return
	}

	c.httpHelper.SendJSON(w, uploadImageResponse{
		Filename: res.Filename,
	}, http.StatusOK)
}
