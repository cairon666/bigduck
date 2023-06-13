package authcontroller

import "net/http"

func (c *controller) logoutHandler(rw http.ResponseWriter, _ *http.Request) {
	c.authHelper.ClearRefreshCookie(rw)
}
