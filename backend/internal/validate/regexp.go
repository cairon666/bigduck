package validate

import "regexp"

var (
	// regexpEmailSimple - Simple email regex that works most of the times
	regexpEmailSimple = regexp.MustCompile(`[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+`)

	// regexpURLSimple - A valid URL with http/https
	regexpURLSimple = regexp.MustCompile(
		`https?://(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_+.~#?&//=]*)`)

	regexpRecoverCodeSimple = regexp.MustCompile(`^[0-9]{4}$`)
)
