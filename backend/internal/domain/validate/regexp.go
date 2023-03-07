package validate

import "regexp"

var (
	emailRegexp     = regexp.MustCompile("(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))")
	passwordRegexp  = regexp.MustCompile("[a-zA-Z0-9#?!@$ %^&*-]{8,}")
	uuidRegexp      = regexp.MustCompile("^[0-9a-fA-F]{8}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{12}$")
	emailCodeRegexp = regexp.MustCompile("^[0-9]{4}$")
	nameRegexp      = regexp.MustCompile("^[a-zA-Z0-9_-]{3,15}$")
)
