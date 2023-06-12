package authhelper

import (
	"net/http"
	"time"
)

const (
	RefreshNameCookie = "Refresh-Cookie"
)

func (h *helper) SetRefreshCookie(rw http.ResponseWriter, refresh string) error {
	http.SetCookie(rw, h.newCookie(RefreshNameCookie, refresh, h.ttlRefresh))

	return nil
}

func (h *helper) GetRefreshCookie(r *http.Request) (string, error) {
	cookie, err := r.Cookie(RefreshNameCookie)
	if err != nil {
		return "", err
	}

	return cookie.Value, nil
}

func (h *helper) ClearRefreshCookie(rw http.ResponseWriter) {
	http.SetCookie(rw, h.newCookie(RefreshNameCookie, "", 0))
}

func (h *helper) newCookie(name, value string, ttl time.Duration) *http.Cookie {
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
