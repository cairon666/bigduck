package httphelper

import (
	"net/http"

	"backend/internal/exceptions"
	"backend/pkg/logger"
)

type subHTTPError struct {
	Message string               `json:"message"`
	Code    exceptions.ErrorCode `json:"code"`
}

type httpError struct {
	Errors []subHTTPError `json:"errors"`
}

func fromAppError(appErr exceptions.AppError) httpError {
	httpErr := httpError{}

	for _, err := range appErr.Errors() {
		httpErr.Errors = append(httpErr.Errors, subHTTPError{
			Message: err.Message(),
			Code:    err.Code(),
		})
	}

	return httpErr
}

func fromError(err exceptions.Error) httpError {
	httpErr := httpError{
		Errors: []subHTTPError{
			{
				Message: err.Message(),
				Code:    err.Code(),
			},
		},
	}

	return httpErr
}

func (h *httpHelper) HandleError(rw http.ResponseWriter, err error) {
	h.log.Info("handled error", logger.Error(err))

	switch err := err.(type) {
	case exceptions.AppError:
		h.SendJSON(rw, fromAppError(err), http.StatusBadRequest)
		return
	case exceptions.Error:
		h.SendJSON(rw, fromError(err), http.StatusBadRequest)
		return
	default:
		_, _ = rw.Write([]byte(err.Error()))
		rw.WriteHeader(http.StatusInternalServerError)

		return
	}
}
