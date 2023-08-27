package attachmentcontroller

import (
	"backend/internal/domain/usecases/attachmentusecase"
	"io"
	"net/http"

	"github.com/go-chi/chi/v5"
)

type getImageHandlerRequest struct {
	ImageName string
}

func (c *Controller) getImageHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	imageName := chi.URLParam(r, "ImageName")

	req := getImageHandlerRequest{ImageName: imageName}

	dto := attachmentusecase.NeGetImageRequest(req.ImageName)
	resp, err := c.attachmentUsecase.GetImage(ctx, dto)
	if err != nil {
		c.httpHelper.HandleError(ctx, w, err)
		return
	}

	for key, value := range resp.File.MetaFile.Headers {
		if value == nil {
			continue
		}

		w.Header().Set(key, *value)
	}

	buf, err := io.ReadAll(resp.File.File)
	if err != nil {
		c.httpHelper.HandleError(ctx, w, err)
		return
	}
	w.Write(buf)

	resp.File.File.Close()
	return
}
