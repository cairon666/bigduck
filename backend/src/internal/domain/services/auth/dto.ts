import { Beda } from "../../../../pkg/beda/Beda";
import { CodeError, Exceptions } from "../../exceptions/exceptions";
import { boolean, object, ValidationError } from "yup";
import { Valid } from "../../exceptions/valid";

const registerSchemeDTO = object({
    login: Valid.login.required(Exceptions.LoginRequired),
    password: Valid.password.required(Exceptions.PasswordRequired),
    is_staff: boolean().default(false),
    is_admin: boolean().default(false),
    phone: Valid.phone.nullable(),
    email: Valid.email.required(Exceptions.EmailRequired),
    username: Valid.username.required(Exceptions.UsernameRequired),
    first_name: Valid.first_name.required(Exceptions.FirstNameRequired),
    second_name: Valid.second_name.required(Exceptions.SecondNameRequired),
    avatar_url: Valid.avatar_url.nullable(),
    day_of_birth: Valid.day_of_birth.nullable(),
    gender: Valid.gender.nullable(),
});

export class RegisterDTO {
    login: string;
    password: string;
    is_staff: boolean;
    is_admin: boolean;
    phone: string | null;
    email: string;
    username: string;
    first_name: string;
    second_name: string;
    avatar_url: string | null;
    day_of_birth: Date | null;
    gender: string | null;

    constructor(
        login: string,
        password: string,
        is_staff: boolean,
        is_admin: boolean,
        phone: string | null,
        email: string,
        username: string,
        first_name: string,
        second_name: string,
        avatar_url: string | null,
        day_of_birth: Date | null,
        gender: string | null
    ) {
        this.login = login;
        this.password = password;
        this.is_staff = is_staff;
        this.is_admin = is_admin;
        this.phone = phone;
        this.email = email;
        this.username = username;
        this.first_name = first_name;
        this.second_name = second_name;
        this.avatar_url = avatar_url;
        this.day_of_birth = day_of_birth;
        this.gender = gender;
    }

    isValid() {
        try {
            registerSchemeDTO.validateSync(this, { abortEarly: false });
        } catch (e) {
            const err = new Beda(Exceptions.Validate, CodeError.Valid);
            if (e instanceof ValidationError) {
                e.errors.forEach((error) => {
                    err.addDesc(error);
                });
            }
            throw err;
        }
    }
}

const loginShemeDTO = object({
    login: Valid.login.required(Exceptions.LoginRequired),
    password: Valid.password.required(Exceptions.PasswordRequired),
});

export class LoginDTO {
    public login: string;
    public password: string;

    constructor(login: string, password: string) {
        this.login = login;
        this.password = password;
    }

    isValid() {
        try {
            loginShemeDTO.validateSync(this, { abortEarly: false });
        } catch (e) {
            const err = new Beda(Exceptions.Validate, CodeError.Valid);
            if (e instanceof ValidationError) {
                e.errors.forEach((error) => {
                    err.addDesc(error);
                });
            }
            throw err;
        }
    }
}

export class LoginResponseDTO {
    public id: string;
    public is_staff: boolean;
    public is_admin: boolean;

    constructor(id: string, is_staff: boolean, is_admin: boolean) {
        this.id = id;
        this.is_staff = is_staff;
        this.is_admin = is_admin;
    }
}
