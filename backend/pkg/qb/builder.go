package qb

import (
	"bytes"
	"strconv"
)

type (
	Builder interface {
		AndWhere(exp WhereExpression) Builder
		OrWhere(exp WhereExpression) Builder
		Set(exp SetExpression) Builder
		Values(args ...any) Builder
		Limit(limit uint) Builder
		ToSQL() (string, []any)
		From(table string) Builder
	}
	Expression interface {
		AppendToBuilder(b *builder)
	}
	builder struct {
		buff         bytes.Buffer
		args         []any
		alreadyWhere bool
		alreadySet   bool
	}
)

func newBuilder() *builder {
	return &builder{
		args: make([]any, 0),
	}
}

func Select(cols ...string) Builder {
	b := newBuilder()

	b.buff.WriteString("SELECT ")

	for index, col := range cols {
		if index != 0 {
			b.buff.WriteString(", ")
		}

		b.buff.WriteString(col)
	}

	return b
}

func Update(table string) Builder {
	b := newBuilder()

	b.buff.WriteString("UPDATE ")
	b.buff.WriteString(table)

	return b
}

func Delete() Builder {
	b := newBuilder()

	b.buff.WriteString("DELETE ")

	return b
}

func Insert(into string, cols ...string) Builder {
	b := newBuilder()

	b.buff.WriteString("INSERT INTO ")
	b.buff.WriteString(into)

	b.buff.WriteString(" (")

	for index, key := range cols {
		if index != 0 {
			b.buff.WriteString(", ")
		}

		b.buff.WriteString(key)
	}

	b.buff.WriteString(")")

	return b
}

func (b *builder) From(table string) Builder {
	b.buff.WriteString(" FROM ")
	b.buff.WriteString(table)

	return b
}

func (b *builder) Limit(limit uint) Builder {
	b.buff.WriteString(" LIMIT ")
	b.buff.WriteString(strconv.Itoa(int(limit)))

	return b
}

func (b *builder) ToSQL() (string, []any) {
	return b.buff.String(), b.args
}
