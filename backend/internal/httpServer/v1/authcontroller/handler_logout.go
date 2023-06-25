package authcontroller

import (
	"net/http"
)

func (c *controller) logoutHandler(rw http.ResponseWriter, req *http.Request) {
	c.authHelper.ClearRefreshCookie(rw)
}
