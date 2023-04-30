package validate

import (
	"errors"
	"testing"
	"time"

	"github.com/google/uuid"
)

type testCase[T any] struct {
	Should error
	Value  T
}

func Testing[T any](t *testing.T, cases []testCase[T], f func(T) error) {
	for index, test := range cases {
		err := f(test.Value)

		if !errors.Is(err, test.Should) {
			t.Errorf("%d: test with value '%v' should be: %v, but expect: %v\n",
				index,
				test.Value,
				test.Should,
				err)
		}
	}
}

func TestEmailSimple(t *testing.T) {
	t.Parallel()

	cases := []testCase[string]{
		{
			Should: nil,
			Value:  "example@example.com",
		},
		{
			Should: ErrBadEmail,
			Value:  "",
		},
	}
	Testing(t, cases, EmailSimple)
}

func TestPasswordSimple(t *testing.T) {
	t.Parallel()

	cases := []testCase[string]{
		{
			Should: nil,
			Value:  "12345678",
		},
		{
			Should: ErrShortPassword,
			Value:  "",
		},
	}
	Testing(t, cases, PasswordSimple)
}

func TestFirstNameSimple(t *testing.T) {
	t.Parallel()

	cases := []testCase[string]{
		{
			Should: nil,
			Value:  "name",
		},
		{
			Should: ErrShortFirstName,
			Value:  "",
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
			Should: ErrShortSecondName,
			Value:  "",
		},
	}
	Testing(t, cases, SecondNameSimple)
}

func TestDayOfBirth(t *testing.T) {
	t.Parallel()

	cases := []testCase[time.Time]{
		{
			Should: nil,
			Value:  time.Now(),
		},
		{
			Should: ErrBadData,
			Value:  time.Now().Add(time.Hour),
		},
	}
	Testing(t, cases, DayOfBirth)
}

func TestAvatarURL(t *testing.T) {
	t.Parallel()

	cases := []testCase[string]{
		{
			Should: nil,
			Value:  "https://example.com",
		},
		{
			Should: ErrBadAvatarURL,
			Value:  "",
		},
	}
	Testing(t, cases, AvatarURL)
}

func TestGender(t *testing.T) {
	t.Parallel()

	cases := []testCase[string]{
		{
			Should: nil,
			Value:  "male",
		},
		{
			Should: nil,
			Value:  "female",
		},
		{
			Should: ErrUnknownGender,
			Value:  "",
		},
	}
	Testing(t, cases, Gender)
}

func TestUUIDSimple(t *testing.T) {
	t.Parallel()

	cases := []testCase[string]{
		{
			Should: nil,
			Value:  uuid.New().String(),
		},
		{
			Should: ErrBadUUID,
			Value:  "",
		},
	}
	Testing(t, cases, UUIDSimple)
}
