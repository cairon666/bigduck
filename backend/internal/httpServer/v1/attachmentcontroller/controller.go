package attachmentcontroller

import (
	"context"

	"backend/internal/domain/usecases/attachmentusecase"
	"backend/internal/httpServer/v1/authhelper"
	"backend/internal/httpServer/v1/httphelper"

	"github.com/go-chi/chi/v5"
)

type AttachmentUsecase interface {
	PutImage(ctx context.Context, dto attachmentusecase.PutImageRequest) (attachmentusecase.PutImageResponse, error)
	GetImage(ctx context.Context, dto attachmentusecase.GetImageRequest) (attachmentusecase.GetImageResponse, error)
}

type Controller struct {
	attachmentUsecase AttachmentUsecase
	httpHelper        *httphelper.HTTPHelper
	authHelper        *authhelper.AuthHelper
}

type Params struct {
	AttachmentUsecase AttachmentUsecase
	HTTPHelper        *httphelper.HTTPHelper
	AuthHelper        *authhelper.AuthHelper
}

func NewController(params Params) *Controller {
	return &Controller{
		attachmentUsecase: params.AttachmentUsecase,
		httpHelper:        params.HTTPHelper,
		authHelper:        params.AuthHelper,
	}
}

func (c *Controller) RegisterRouter(r chi.Router) {
	r.Route("/attachment", func(r chi.Router) {
		r.Post("/image", c.uploadImageHandler)
		r.Get("/image/{ImageName}", c.getImageHandler)
		r.Head("/image/{ImageName}", c.headImageHandler)
	})
}
