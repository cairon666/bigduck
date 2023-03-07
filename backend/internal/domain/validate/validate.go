package validate

func EmailStrict(email string) (err error) {
	if !emailRegexp.Match([]byte(email)) {
		return ErrorEmailInvalid
	}

	if len(email) == 0 {
		return ErrorEmailInvalid
	}

	return nil
}

func PasswordEasy(password string) error {
	if !passwordRegexp.Match([]byte(password)) {
		return ErrorPasswordInvalid
	}

	if len(password) == 0 {
		return ErrorPasswordInvalid
	}

	return nil
}

func EmailCode(code string) error {
	if !emailCodeRegexp.Match([]byte(code)) {
		return ErrorEmailCodeInvalid
	}

	if len(code) == 0 {
		return ErrorEmailCodeInvalid
	}

	return nil
}

func Uuid(uuid string) error {
	if !uuidRegexp.Match([]byte(uuid)) {
		return ErrorUuidInvalid
	}

	if len(uuid) == 0 {
		return ErrorUuidInvalid
	}

	return nil
}

func FirstName(name string) error {
	if !nameRegexp.Match([]byte(name)) {
		return ErrorFirstNameInvalid
	}

	if len(name) == 0 {
		return ErrorFirstNameInvalid
	}

	return nil
}

func SecondName(name string) error {
	if !nameRegexp.Match([]byte(name)) {
		return ErrorSecondNameInvalid
	}

	if len(name) == 0 {
		return ErrorSecondNameInvalid
	}

	return nil
}
