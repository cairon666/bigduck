package authHelper

import (
	"net/http"
	"time"
)

type helper struct {
	issuer     string
	private    []byte
	ttlAccess  time.Duration
	ttlRefresh time.Duration
}

type HelperProps struct {
	Issuer     string
	Private    []byte
	TtlAccess  time.Duration
	TtlRefresh time.Duration
}

type Helper interface {
	NewTokens(IdUser string) (access string, refresh string, err error)
	UpdateTokens(refresh string) (newAccess string, newRefresh string, err error)
	ParseToken(tokenString string) (*Claims, error)
	SetRefreshCookie(rw http.ResponseWriter, refresh string) error
	GetRefreshCookie(r *http.Request) (string, error)
	ClearRefreshCookie(rw http.ResponseWriter)
}

func NewHelper(props HelperProps) Helper {
	return &helper{
		issuer:     props.Issuer,
		private:    props.Private,
		ttlAccess:  props.TtlAccess,
		ttlRefresh: props.TtlRefresh,
	}
}
