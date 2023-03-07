package http

import (
	"authService/pkg/beda"
	"net/http"
	"time"
)

const (
	RefreshTokenName = "Refresh-Token"
	RefreshTokenTTL  = time.Hour * 24 * 30
)

func newRefreshClearCookie() *http.Cookie {
	return newCookie(RefreshTokenName, "", 0)
}

func newRefreshCookie(token string) *http.Cookie {
	return newCookie(RefreshTokenName, token, RefreshTokenTTL)
}

func newCookie(name, token string, ttl time.Duration) *http.Cookie {
	return &http.Cookie{
		Name:  name,
		Value: token,
		Path:  "/",
		//Domain:     "",
		Expires:  time.Now().Add(ttl),
		Secure:   false,
		HttpOnly: false,
	}
}

func getRefreshCookie(r *http.Request) (*http.Cookie, error) {
	cookie, err := r.Cookie(RefreshTokenName)
	if err != nil {
		return nil, beda.New("dont have refresh cookie", err)
	}

	return cookie, nil
}
