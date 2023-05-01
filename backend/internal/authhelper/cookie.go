package authhelper

import (
	"net/http"
	"time"
)

const (
	refreshNameCookie = "Refresh-Cookie"
)

func (h *Helper) SetRefreshCookie(rw http.ResponseWriter, refresh string) error {
	http.SetCookie(rw, h.newCookie(refreshNameCookie, refresh, h.ttlRefresh))

	return nil
}

func (h *Helper) GetRefreshCookie(r *http.Request) (string, error) {
	cookie, err := r.Cookie(refreshNameCookie)
	if err != nil {
		return "", err
	}

	return cookie.Value, nil
}

func (h *Helper) ClearRefreshCookie(rw http.ResponseWriter) {
	http.SetCookie(rw, h.newCookie(refreshNameCookie, "", 0))
}

func (h *Helper) newCookie(name, value string, ttl time.Duration) *http.Cookie {
	return &http.Cookie{
		Name:  name,
		Value: value,
		Path:  "/",
		//Domain:  "",
		Expires: time.Now().Add(ttl),
		MaxAge:  0,
		//Secure:     false,
		//HttpOnly:   false,
		//SameSite:   0,
	}
}
