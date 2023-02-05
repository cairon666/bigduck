import {Beda} from "../../../../pkg/beda/Beda";
import {CodeError, Exceptions} from "../../exceptions/exceptions";
import {boolean, date, object, string, ValidationError} from "yup";

const registerSchemeDTO = object({
    login: string()
        .required(Exceptions.LoginRequired)
        .min(4, Exceptions.LoginShort),
    password: string()
        .required(Exceptions.PasswordRequired)
        .min(4, Exceptions.PasswordShort),
    is_staff: boolean()
        .default(false),
    is_admin: boolean()
        .default(false),
    phone: string()
        .nullable(),
    email: string()
        .required(Exceptions.EmailRequired)
        .email(Exceptions.EmailInvalid),
    username: string()
        .required(Exceptions.UsernameRequired)
        .min(4, Exceptions.UsernameShort),
    first_name: string()
        .required(Exceptions.FirstNameRequired)
        .min(4, Exceptions.FirstNameShort),
    second_name: string()
        .required(Exceptions.SecondNameRequired)
        .min(4, Exceptions.SecondNameShort),
    avatar_url: string().nullable(),
    day_of_birth: date().nullable(),
    gender: string().nullable(),
})

export class RegisterDTO {
    login: string
    password: string
    is_staff: boolean
    is_admin: boolean
    phone: string | null
    email: string
    username: string
    first_name: string
    second_name: string
    avatar_url: string | null
    day_of_birth: Date | null
    gender: string | null

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
        gender: string | null,
    ) {

        this.login = login
        this.password = password
        this.is_staff = is_staff
        this.is_admin = is_admin
        this.phone = phone
        this.email = email
        this.username = username
        this.first_name = first_name
        this.second_name = second_name
        this.avatar_url = avatar_url
        this.day_of_birth = day_of_birth
        this.gender = gender
    }

    isValid() {
        try {
            registerSchemeDTO.validateSync(this, {abortEarly: false})
        } catch (e) {
            const err = new Beda(Exceptions.Validate, CodeError.Valid)
            if (e instanceof ValidationError) {
                e.errors.forEach((error) => {
                    err.addDesc(error)
                })
            }
            throw err
        }
    }
}

const loginShemeDTO = object({
    login: string()
        .required(Exceptions.LoginRequired)
        .min(4, Exceptions.LoginShort),
    password: string()
        .required(Exceptions.PasswordRequired)
        .min(4, Exceptions.PasswordShort),
})

export class LoginDTO {
    public login: string
    public password: string

    constructor(login: string, password: string) {
        this.login = login
        this.password = password
    }

    isValid() {
        try {
            loginShemeDTO.validateSync(this, {abortEarly: false})
        } catch (e) {
            const err = new Beda(Exceptions.Validate, CodeError.Valid)
            if (e instanceof ValidationError) {
                e.errors.forEach((error) => {
                    err.addDesc(error)
                })
            }
            throw err
        }
    }
}

export class LoginResponseDTO {
    public id: string
    public is_staff: boolean
    public is_admin: boolean

    constructor(
        id: string,
        is_staff: boolean,
        is_admin: boolean,
    ) {
        this.id = id
        this.is_staff = is_staff
        this.is_admin = is_admin
    }
}