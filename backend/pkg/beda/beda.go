package beda

import "fmt"

type Beda interface {
	Error() string
	Wrap(msg string) Beda
	Message() string
	First() Beda
}

type beda struct {
	msg    string
	err    error
	isSkip bool
}

func New(msg string, err error) Beda {
	return &beda{
		msg: msg,
		err: err,
	}
}

func NewWhere(method, operation string, err error) Beda {
	return &beda{
		msg:    fmt.Sprintf("%s.%s", method, operation),
		err:    err,
		isSkip: true,
	}
}

func (b *beda) Error() string {
	return fmt.Sprintf("%s: %v", b.msg, b.err)
}

func (b *beda) Message() string {
	return b.msg
}

func (b *beda) First() Beda {
	list := []*beda{b}

	cur := b
	for childBeda, ok := b.err.(*beda); ok; childBeda, ok = cur.err.(*beda) {
		list = append(list, childBeda)
		cur = childBeda
	}

	// first not skipper beda
	var first *beda
	for i := len(list) - 1; i >= 0; i-- {
		if !list[i].isSkip {
			first = list[i]
			break
		}
	}
	return first
}

func (b *beda) Wrap(msg string) Beda {
	*b = beda{
		msg: msg,
		err: b,
	}
	return b
}
