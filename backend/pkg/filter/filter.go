package filter

import (
	"github.com/Masterminds/squirrel"
)

type Type uint8

const (
	TypeEQ Type = iota + 1
	TypeNotEQ
	TypeGTE
	TypeGT
	TypeLT
	TypeLTE
	TypeLike
	TypeNotLike
	TypeILike
	TypeNotILike
)

type Op uint8

const (
	OpAnd Op = iota + 1
	OpOr
)

type Filter struct {
	column   string
	ftype    Type
	value    any
	operator Op
	filters  []Filter
}

func New(column string, ftype Type, value any) Filter {
	return Filter{
		column:   column,
		ftype:    ftype,
		value:    value,
		operator: OpAnd,
		filters:  []Filter{},
	}
}

// SetOperator sets operator for linking filters.
func (f *Filter) SetOperator(operator Op) *Filter {
	f.operator = operator

	return f
}

// WithFilters adds filters.
func (f *Filter) WithFilters(filters ...Filter) *Filter {
	f.filters = append(f.filters, filters...)

	return f
}

func (f *Filter) Add(col string, ftype Type, val any) *Filter {
	if col == "" || ftype == 0 || val == nil {
		return f
	}

	f.filters = append(f.filters, New(col, ftype, val))

	return f
}

//nolint:cyclop
func (f *Filter) condition() squirrel.Sqlizer {
	switch f.ftype {
	case TypeEQ:
		return squirrel.Eq{f.column: f.value}
	case TypeNotEQ:
		return squirrel.NotEq{f.column: f.value}
	case TypeGTE:
		return squirrel.GtOrEq{f.column: f.value}
	case TypeGT:
		return squirrel.Gt{f.column: f.value}
	case TypeLT:
		return squirrel.Lt{f.column: f.value}
	case TypeLTE:
		return squirrel.LtOrEq{f.column: f.value}
	case TypeLike:
		return squirrel.Like{f.column: f.value}
	case TypeNotLike:
		return squirrel.NotLike{f.column: f.value}
	case TypeILike:
		return squirrel.ILike{f.column: f.value}
	case TypeNotILike:
		return squirrel.NotILike{f.column: f.value}
	}

	return squirrel.Eq{f.column: f.value}
}

func (f *Filter) getConditions() squirrel.Sqlizer {
	if len(f.filters) == 0 {
		return f.condition()
	}

	conditions := []squirrel.Sqlizer{f.condition()}

	for _, filter := range f.filters {
		conditions = append(conditions, filter.getConditions())
	}

	if f.operator == OpOr {
		return or(conditions)
	}

	return and(conditions)
}

// AttachToSelect adds filters to squirrel.SelectBuilder.
func (f *Filter) AttachToSelect(b squirrel.SelectBuilder) squirrel.SelectBuilder {
	return b.Where(f.getConditions())
}

func and(conditions []squirrel.Sqlizer) squirrel.And {
	res := squirrel.And{}

	for _, c := range conditions {
		res = append(res, c)
	}

	return res
}

func or(conditions []squirrel.Sqlizer) squirrel.Or {
	res := squirrel.Or{}

	for _, c := range conditions {
		res = append(res, c)
	}

	return res
}
