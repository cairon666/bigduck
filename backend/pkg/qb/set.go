package qb

type (
	SetExpression interface {
		Expression
	}
)

func (b *builder) startSet() {
	b.alreadySet = true
	b.buff.WriteString(" SET ")
}

func (b *builder) Values(args ...any) Builder {
	b.buff.WriteString(" VALUES (")

	for index, arg := range args {
		if index != 0 {
			b.buff.WriteString(", ")
		}

		b.appendArgToBuff(arg)
	}

	b.buff.WriteString(")")

	return b
}

func (b *builder) Set(exp SetExpression) Builder {
	if b.alreadySet {
		b.buff.WriteString(", ")
	} else {
		b.startSet()
	}

	exp.AppendToBuilder(b)

	return b
}
