package v1

import (
	"net/http"

	"backend/pkg/beda"
)

type refreshResponse struct {
	AccessToken string `json:"access_token"`
}

func (s *Server) refreshHandler(rw http.ResponseWriter, r *http.Request) {
	refresh, err := s.authHelper.GetRefreshCookie(r)
	if err != nil {
		s.handleError(rw, beda.Wrap("GetRefreshCookie", err))

		return
	}

	newAccess, newRefresh, err := s.authHelper.UpdateTokens(refresh)
	if err != nil {
		s.handleError(rw, beda.Wrap("UpdateTokens", err))

		return
	}

	if err := s.authHelper.SetRefreshCookie(rw, newRefresh); err != nil {
		s.handleError(rw, beda.Wrap("SetRefreshCookie", err))

		return
	}

	s.sendJSON(rw, refreshResponse{AccessToken: newAccess}, http.StatusOK)
}
