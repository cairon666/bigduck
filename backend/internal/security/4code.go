package security

import (
	"crypto/rand"
	"math/big"
	"strings"
)

const (
	CodeLength = 4
	maxCode
)

var max = big.NewInt(maxCode)

func GenerateCode() (string, error) {
	codeBuilder := strings.Builder{}
	codeBuilder.Grow(CodeLength)

	for i := 0; i < CodeLength; i++ {
		randInt, err := rand.Int(rand.Reader, max)
		if err != nil {
			return "", err
		}

		_, _ = codeBuilder.WriteString(randInt.String())
	}

	return codeBuilder.String(), nil
}
