package v1

import (
	"encoding/json"
	"net/http"

	"backend/internal/exceptions"
	"backend/pkg/beda"
	"backend/pkg/logger"
)

func (s *Server) sendJSON(rw http.ResponseWriter, data any, status int) {
	rw.Header().Add("Content-Type", "application/json; charset=utf-8")
	rw.WriteHeader(status)

	if err := json.NewEncoder(rw).Encode(data); err != nil {
		s.log.Error("sendJSON", logger.Error(beda.Wrap("Encode", err)))
	}
}

func shouldEqualIDUserOrAdmin(r *http.Request, id string) error {
	ctxIDUser, ok := r.Context().Value(idUserKey).(string)
	if !ok || ctxIDUser != id {
		return beda.Wrap("Value", exceptions.ErrForbidden)
	}

	return nil
}
