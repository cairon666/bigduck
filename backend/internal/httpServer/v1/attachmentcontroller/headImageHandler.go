package attachmentcontroller

import "net/http"

func (c *Controller) headImageHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusNotImplemented)

	return
}
