package authcontroller

import "net/http"

type refreshResponse struct {
	AccessToken string `json:"access_token"`
}

func (c *controller) refreshHandler(rw http.ResponseWriter, r *http.Request) {
	refresh, err := c.authHelper.GetRefreshCookie(r)
	if err != nil {
		c.httpHelper.HandleError(rw, err)
		return
	}

	newAccess, newRefresh, err := c.authHelper.UpdateTokens(refresh)
	if err != nil {
		c.httpHelper.HandleError(rw, err)
		return
	}

	if err := c.authHelper.SetRefreshCookie(rw, newRefresh); err != nil {
		c.httpHelper.HandleError(rw, err)
		return
	}

	c.httpHelper.SendJSON(rw, refreshResponse{AccessToken: newAccess}, http.StatusOK)
}
