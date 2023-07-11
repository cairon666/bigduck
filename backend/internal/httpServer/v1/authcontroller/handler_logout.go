package authcontroller

import (
	"net/http"
)

func (c *Controller) logoutHandler(rw http.ResponseWriter, req *http.Request) {
	c.authHelper.ClearRefreshCookie(rw)
}
