package qb

import "strconv"

func (b *builder) appendArgToBuff(arg any) {
	b.args = append(b.args, arg)
	b.buff.WriteString("$")
	b.buff.WriteString(strconv.Itoa(len(b.args)))
}
