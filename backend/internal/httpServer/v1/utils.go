package v1

import (
	"backend/pkg/beda"
	"backend/pkg/logger"
	"encoding/json"
	"errors"
	"net/http"
)

func (s *server) handleError(rw http.ResponseWriter, err error) {
	if _, err := rw.Write([]byte(err.Error())); err != nil {
		s.log.Error("Write", logger.Error(beda.Wrap("Write", err)))
	}
}

func (s *server) sendJSON(rw http.ResponseWriter, data any, status int) {
	rw.Header().Add("Content-Type", "application/json; charset=utf-8")
	rw.WriteHeader(status)
	if err := json.NewEncoder(rw).Encode(data); err != nil {
		s.log.Error("sendJSON", logger.Error(beda.Wrap("Encode", err)))
	}
}

func shouldEqualIdUserOrAdmin(r *http.Request, IdUser string) error {
	ctxIdUser, ok := r.Context().Value(idUserKey).(string)
	if !ok || ctxIdUser != IdUser {
		return errors.New("forbidden")
	}

	return nil
}
