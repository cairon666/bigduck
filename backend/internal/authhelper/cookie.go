package authhelper

import (
	"net/http"
	"time"
)

const (
	RefreshNameCookie = "Refresh-Cookie"
)

func (h *Helper) SetRefreshCookie(rw http.ResponseWriter, refresh string) error {
	http.SetCookie(rw, h.newCookie(RefreshNameCookie, refresh, h.ttlRefresh))

	return nil
}

func (h *Helper) GetRefreshCookie(r *http.Request) (string, error) {
	cookie, err := r.Cookie(RefreshNameCookie)
	if err != nil {
		return "", err
	}

	return cookie.Value, nil
}

func (h *Helper) ClearRefreshCookie(rw http.ResponseWriter) {
	http.SetCookie(rw, h.newCookie(RefreshNameCookie, "", 0))
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

func GetRefreshCookieFromResponse(r *http.Response) (string, error) {
	for _, cook := range r.Cookies() {
		if cook.Name == RefreshNameCookie {
			return cook.Value, nil
		}
	}

	return "", nil
}
