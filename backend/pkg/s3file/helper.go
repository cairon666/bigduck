package s3file

import "net/textproto"

func MIMEHeader2Header(h textproto.MIMEHeader) map[string]*string {
	n := make(map[string]*string, len(h))

	for key, value := range h {
		var v string

		if len(value) == 0 {
			v = ""
		} else {
			v = value[0]
		}

		n[key] = &v
	}

	return n
}
