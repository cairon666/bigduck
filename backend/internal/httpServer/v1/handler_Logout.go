package v1

import "net/http"

func (s *server) logoutHandler(rw http.ResponseWriter, r *http.Request) {
	s.authHelper.ClearRefreshCookie(rw)
}
