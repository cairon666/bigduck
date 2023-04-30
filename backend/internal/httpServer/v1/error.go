package v1

import (
	"net/http"

	"backend/internal/exceptions"
	"backend/pkg/logger"
)

func (s *Server) handleError(rw http.ResponseWriter, err error) {
	s.log.Info("handle error", logger.Error(err))

	// go to non-unwrap error
	for {
		if x, ok := err.(interface{ Unwrap() error }); ok {
			err = x.Unwrap()
			continue
		}

		break
	}

	switch err := err.(type) {
	case exceptions.Error:
		s.sendJSON(rw, err.GetData(), err.GetCode())
		return
	default:
		s.sendJSON(rw, exceptions.ErrUnknown.GetData(), exceptions.ErrUnknown.GetCode())
		return
	}
}
