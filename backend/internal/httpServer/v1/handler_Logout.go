package v1

import "net/http"

func (s *Server) logoutHandler(rw http.ResponseWriter, _ *http.Request) {
	s.authHelper.ClearRefreshCookie(rw)
}
