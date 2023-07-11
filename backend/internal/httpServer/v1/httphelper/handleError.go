package httphelper

import (
	"context"
	"net/http"

	"backend/internal/exceptions"
	"backend/internal/exceptions/validate"
	"backend/pkg/logger"
	"backend/pkg/middleware"
)

type HTTPError struct {
	Message string `json:"message"`
}

func (h *HTTPHelper) HandleError(ctx context.Context, rw http.ResponseWriter, err error) {
	var (
		errorField     = logger.Error(err)
		requestIDField = logger.String(middleware.RequestIDHeader, middleware.GetReqID(ctx))
		errorType      string
	)

	switch err := err.(type) {
	case *validate.Error:
		{
			errorType = "validateErr"
			h.sendValidateError(rw, err)
		}
	case *exceptions.Error:
		{
			errorType = "appErr"
			h.sendAppError(rw, err)
		}
	case *exceptions.ForbiddenError:
		{
			errorType = "forbiddenErr"
			rw.WriteHeader(http.StatusForbidden)
		}
	case *exceptions.InternalError:
		{
			errorType = "internalErr"
			rw.WriteHeader(http.StatusInternalServerError)
		}
	default:
		{
			errorType = "nonHandleErr"
			rw.WriteHeader(http.StatusInternalServerError)
		}
	}

	h.log.Info(errorType, errorField, requestIDField)
}
