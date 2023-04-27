package v1

import (
	"encoding/json"
	"net/http"

	"backend/internal/exceptions"
	"backend/pkg/logger"
)

type httpErr struct {
	Error  string   `json:"error"`
	Errors []string `json:"errors"`
}

func (s *Server) handleError(rw http.ResponseWriter, err error) {
	s.log.Error("handle error", logger.Error(err))

	// go to non unwrap error
	for {
		if x, ok := err.(interface{ Unwrap() error }); ok {
			err = x.Unwrap()
			continue
		}

		break
	}

	switch err := err.(type) {
	case *exceptions.ValidateError:
		s.sendJSON(rw, httpErr{
			Error:  err.Message(),
			Errors: err.Errors(),
		}, http.StatusBadRequest)
	case *exceptions.CustomError:
		s.sendJSON(rw, httpErr{
			Error: err.Error(),
		}, err.GetCode())
	case *json.UnmarshalTypeError:
		s.sendJSON(rw, httpErr{
			Error: err.Error(),
		}, http.StatusBadRequest)
	default:
		s.sendJSON(rw, httpErr{
			Error: "unhandled error",
		}, http.StatusInternalServerError)
	}
}
