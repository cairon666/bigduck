package validate

import "regexp"

var (
	regexpEmail = regexp.MustCompile(`[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+`)
	regexpURL   = regexp.MustCompile(
		`https?://(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_+.~#?&//=]*)`)
	regexpSpecialCharacter          = regexp.MustCompile(`([!@#$%^&*.?-])+`)
	regexpOneDigital                = regexp.MustCompile(`([0-9])+`)
	regexpOneUpperCharacter         = regexp.MustCompile(`([A-Z])+`)
	regexpOneLowerCharacter         = regexp.MustCompile(`([a-z])+`)
	regexpNotNumberCharacterSpecial = regexp.MustCompile(`[^0-9a-zA-Z_]`)
	regexpNotLettersAndSpace        = regexp.MustCompile(`[^\p{L} ]`)
	regexpFourCode                  = regexp.MustCompile(`^[0-9]{4}$`)
)
