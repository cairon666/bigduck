package authHelper

import (
	"backend/pkg/beda"
	"net/http"
	"time"
)

const (
	refreshNameCookie = "Refresh-Cookie"
)

func (h *helper) SetRefreshCookie(rw http.ResponseWriter, refresh string) error {
	http.SetCookie(rw, h.newCookie(refreshNameCookie, refresh, h.ttlRefresh))
	return nil
}

func (h *helper) GetRefreshCookie(r *http.Request) (string, error) {
	cookie, err := r.Cookie(refreshNameCookie)
	if err != nil {
		return "", beda.Wrap("Cookie", err)
	}

	return cookie.Value, nil
}

func (h *helper) ClearRefreshCookie(rw http.ResponseWriter) {
	http.SetCookie(rw, h.newCookie(refreshNameCookie, "", 0))
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
