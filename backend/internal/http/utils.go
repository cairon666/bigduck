package http

import (
	"authService/internal/domain/exceptions"
	"authService/pkg/beda"
	"authService/pkg/logger"
	"encoding/json"
	"net/http"
)

func (s *server) sendJSON(rw http.ResponseWriter, data any, status int) {
	rw.Header().Set("Content-Type", "application/json; charset=utf-8")
	rw.WriteHeader(status)
	err := json.NewEncoder(rw).Encode(data)
	if err != nil {
		s.log.Error("sendJSON", logger.Error(err))
	}
}

type httpError struct {
	Message string `json:"message"`
}

func (s *server) sendError(rw http.ResponseWriter, err string, status int) {
	s.sendJSON(rw, httpError{Message: err}, status)
}

func (s *server) handleError(rw http.ResponseWriter, err error) {
	s.log.Error("handleError", logger.Error(err))

	var rwErr string

	switch err.(type) {
	case beda.Beda:
		{
			b := err.(beda.Beda).First()
			if b != nil {
				rwErr = b.Message()
				break
			}
		}
	default:
		rwErr = exceptions.ErrorUnknown
	}

	s.sendError(rw, rwErr, http.StatusBadRequest)
}
