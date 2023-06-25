package httphelper

import (
	"context"
	"net/http"

	"backend/internal/exceptions"
	"backend/pkg/logger"
	"backend/pkg/middleware"
)

type subHTTPError struct {
	Message string               `json:"message"`
	Code    exceptions.ErrorCode `json:"code"`
}

type httpError struct {
	Errors []subHTTPError `json:"errors"`
}

func fromAppError(err *exceptions.AppError) httpError {
	return httpError{
		Errors: []subHTTPError{
			{
				Message: err.Msg,
				Code:    err.Code,
			},
		},
	}
}

func fromMultiValidateError(err *exceptions.MultiValidateError) httpError {
	httpError := httpError{
		Errors: make([]subHTTPError, 0, len(err.Errs)),
	}

	for _, err := range err.Errs {
		httpError.Errors = append(httpError.Errors, subHTTPError{
			Message: err.Message,
			Code:    err.Code,
		})
	}

	return httpError
}

func fromValidateError(err *exceptions.ValidateError) httpError {
	return httpError{
		Errors: []subHTTPError{
			{
				Message: err.Message,
				Code:    err.Code,
			},
		},
	}
}

func (h *httpHelper) HandleError(ctx context.Context, rw http.ResponseWriter, err error) {
	var (
		errorField     = logger.Error(err)
		requestIDField = logger.String(middleware.RequestIDHeader, middleware.GetReqID(ctx))
		errorType      string
	)

	switch err := err.(type) {
	case *exceptions.AppError:
		{
			errorType = "AppError"
			h.SendJSON(rw, fromAppError(err), http.StatusBadRequest)
		}
	case *exceptions.MultiValidateError:
		{
			errorType = "MultiValidateError"
			h.SendJSON(rw, fromMultiValidateError(err), http.StatusBadRequest)
		}
	case *exceptions.ValidateError:
		{
			errorType = "ValidateError"
			h.SendJSON(rw, fromValidateError(err), http.StatusBadRequest)
		}
	case *exceptions.ForbiddenError:
		{
			errorType = "ForbiddenError"
			rw.WriteHeader(http.StatusForbidden)
		}
	case *exceptions.InternalError:
		{
			errorType = "InternalError"
			rw.WriteHeader(http.StatusInternalServerError)
		}
	default:
		{
			errorType = "NonHandleError"
			rw.WriteHeader(http.StatusInternalServerError)
		}
	}

	h.log.Info(errorType, errorField, requestIDField)
}
