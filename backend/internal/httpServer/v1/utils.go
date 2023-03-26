package v1

import (
	"backend/pkg/beda"
	"backend/pkg/logger"
	"encoding/json"
	"net/http"
)

func (s *server) handleError(rw http.ResponseWriter, err error) {
	rw.Write([]byte(err.Error()))
}

func (s *server) sendJSON(rw http.ResponseWriter, data any, status int) {
	rw.Header().Add("Content-Type", "application/json; charset=utf-8")
	rw.WriteHeader(status)
	if err := json.NewEncoder(rw).Encode(data); err != nil {
		s.log.Error("sendJSON", logger.Error(beda.Wrap("Encode", err)))
	}
}
