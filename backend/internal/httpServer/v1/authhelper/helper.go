package authhelper

import (
	"time"
)

type AuthHelper struct {
	issuer     string
	private    []byte
	ttlAccess  time.Duration
	ttlRefresh time.Duration
}

type Props struct {
	Issuer     string
	Private    []byte
	TTLAccess  time.Duration
	TTLRefresh time.Duration
}

func NewAuthHelper(props Props) *AuthHelper {
	return &AuthHelper{
		issuer:     props.Issuer,
		private:    props.Private,
		ttlAccess:  props.TTLAccess,
		ttlRefresh: props.TTLRefresh,
	}
}
