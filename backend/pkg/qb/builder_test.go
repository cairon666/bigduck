package qb

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestSelect(t *testing.T) {
	t.Parallel()

	sql, _ := Select("1", "2", "3").
		From("test").
		AndWhere(Eql("first", "first_arg")).
		AndWhere(Eql("second", "second_arg")).
		ToSQL()

	assert.Equal(t, sql, "SELECT (1, 2, 3) FROM test WHERE first = $1 AND second = $2")
}

func TestInsert(t *testing.T) {
	t.Parallel()

	sql, _ := Insert("test", "1", "2", "3").
		Values(1, 2, 3).
		ToSQL()

	assert.Equal(t, sql, "INSERT INTO test (1, 2, 3) VALUES ($1, $2, $3)")
}

func TestUpdate(t *testing.T) {
	t.Parallel()

	sql, _ := Update("test").
		Set(Eql("first", "first_arg")).
		Set(Eql("second", "second_arg")).
		AndWhere(Eql("first", "first_arg")).
		AndWhere(Eql("second", "second_arg")).
		ToSQL()

	assert.Equal(t, sql, "UPDATE test SET first = $1, second = $2 WHERE first = $3 AND second = $4")
}
