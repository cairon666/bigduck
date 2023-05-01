package authhelper

import (
	"time"
)

type Helper struct {
	issuer     string
	private    []byte
	ttlAccess  time.Duration
	ttlRefresh time.Duration
}

type HelperProps struct {
	Issuer     string
	Private    []byte
	TTLAccess  time.Duration
	TTLRefresh time.Duration
}

func NewHelper(props HelperProps) *Helper {
	return &Helper{
		issuer:     props.Issuer,
		private:    props.Private,
		ttlAccess:  props.TTLAccess,
		ttlRefresh: props.TTLRefresh,
	}
}
