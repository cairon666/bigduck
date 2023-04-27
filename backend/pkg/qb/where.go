package qb

type (
	WhereExpression interface {
		Expression
	}
	eql struct {
		key   string
		value any
	}
)

func (e *eql) AppendToBuilder(b *builder) {
	b.buff.WriteString(e.key)
	b.buff.WriteString(" = ")
	b.appendArgToBuff(e.value)
}

func Eql(key string, value any) WhereExpression {
	return &eql{
		key:   key,
		value: value,
	}
}

func (b *builder) startWhere() {
	b.alreadyWhere = true
	b.buff.WriteString(" WHERE ")
}

func (b *builder) AndWhere(exp WhereExpression) Builder {
	if b.alreadyWhere {
		b.buff.WriteString(" AND ")
	} else {
		b.startWhere()
	}

	exp.AppendToBuilder(b)

	return b
}

func (b *builder) OrWhere(exp WhereExpression) Builder {
	if b.alreadyWhere {
		b.buff.WriteString(" OR")
	} else {
		b.startWhere()
	}

	exp.AppendToBuilder(b)

	return b
}
