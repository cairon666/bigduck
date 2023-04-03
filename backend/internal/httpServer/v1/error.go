package v1

import (
	"encoding/json"
	"net/http"

	"backend/internal/exceptions"
	"backend/pkg/logger"
)

var (
	unhandledErr = customErr{
		Error: "unhandled error",
	}
)

type customErr struct {
	Error string `json:"error"`
}

type validateErr struct {
	Error  string   `json:"error"`
	Errors []string `json:"errors,omitempty"`
}

func (s *Server) handleError(w http.ResponseWriter, err error) {
	s.log.Error("handle error", logger.Error(err))

	// go to non unwrap error
	for x, ok := err.(interface{ Unwrap() error }); ok; {
		err = x.Unwrap()
	}

	switch someErr := err.(type) {
	case *exceptions.ValidateError:
		s.sendJSON(w, validateErr{
			Error:  someErr.Message(),
			Errors: someErr.Errors(),
		}, http.StatusBadRequest)
	case *exceptions.CustomError:
		s.sendJSON(w, customErr{
			Error: someErr.Error(),
		}, someErr.GetCode())
	case *json.UnmarshalTypeError:
		s.sendJSON(w, customErr{
			Error: someErr.Error(),
		}, http.StatusBadRequest)
	default:
		s.sendJSON(w, unhandledErr, http.StatusInternalServerError)
	}
}
