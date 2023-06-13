package validate

import (
	"testing"

	"backend/internal/domain/exceptions"
)

func TestFirstNameSimple(t *testing.T) {
	t.Parallel()

	cases := []testCase[string]{
		{
			Should: nil,
			Value:  "name",
		},
		{
			Should: exceptions.ErrShortFirstName,
			Value:  "",
		},
		{
			Should: exceptions.ErrLongFirstName,
			Value:  "asddsaasddasadsdas",
		},
		{
			Should: exceptions.ErrFirstNameHasNoLetter,
			Value:  "asddsa123",
		},
	}
	Testing(t, cases, FirstNameSimple)
}

func TestSecondNameSimple(t *testing.T) {
	t.Parallel()

	cases := []testCase[string]{
		{
			Should: nil,
			Value:  "name",
		},
		{
			Should: exceptions.ErrShortSecondName,
			Value:  "",
		},
		{
			Should: exceptions.ErrLongSecondName,
			Value:  "asddsaasddasadsdas",
		},
		{
			Should: exceptions.ErrSecondNameHasNoLetter,
			Value:  "asddsa123",
		},
	}
	Testing(t, cases, SecondNameSimple)
}

func TestUserNameSimple(t *testing.T) {
	t.Parallel()

	cases := []testCase[string]{
		{
			Should: nil,
			Value:  "username",
		},
		{
			Should: nil,
			Value:  "user_name",
		},
		{
			Should: exceptions.ErrShortUserName,
			Value:  "",
		},
		{
			Should: exceptions.ErrLongUserName,
			Value:  "saddassdadsasdasdasda",
		},
		{
			Should: exceptions.ErrUserNameHasNotNumberOrNoLetter,
			Value:  "sadda ds",
		},
	}
	Testing(t, cases, UserNameSimple)
}
