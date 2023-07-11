package httphelper

import (
	"encoding/json"
	"net/http"

	"backend/pkg/logger"
)

func (h *HTTPHelper) SendJSON(rw http.ResponseWriter, data any, status int) {
	rw.Header().Add("Content-Type", "application/json; charset=utf-8")
	rw.WriteHeader(status)

	if err := json.NewEncoder(rw).Encode(data); err != nil {
		h.log.Error("sendJSON", logger.Error(err))
	}
}
