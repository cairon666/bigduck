import {Beda} from "../../../../pkg/beda/Beda";
import {CodeError} from "../../exceptions/codes";
import {Exceptions, ValidateError} from "../../exceptions/exceptions";
import {boolean, date, object, string, ValidationError} from "yup";

const registerSchemeDTO = object({
    login: string()
        .required(Exceptions.RegisterLoginRequired)
        .min(4, Exceptions.RegisterLoginShort),
    password: string()
        .required(Exceptions.RegisterPasswordRequired)
        .min(4, Exceptions.RegisterPasswordShort),
    is_staff: boolean()
        .default(false),
    is_admin: boolean()
        .default(false),
    phone: string()
        .nullable(),
    email: string()
        .required(Exceptions.RegisterEmailRequired)
        .email(Exceptions.RegisterEmailInvalid),
    username: string()
        .required(Exceptions.RegisterUsernameRequired)
        .min(4, Exceptions.RegisterUsernameShort),
    first_name: string()
        .required(Exceptions.RegisterFirstNameRequired)
        .min(4, Exceptions.RegisterFirstNameShort),
    second_name: string()
        .required(Exceptions.RegisterSecondNameRequired)
        .min(4, Exceptions.RegisterSecondNameShort),
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
        .required(Exceptions.RegisterLoginRequired)
        .min(4, Exceptions.RegisterLoginShort),
    password: string()
        .required(Exceptions.RegisterPasswordRequired)
        .min(4, Exceptions.RegisterPasswordShort),
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
            const err = new Beda(ValidateError, CodeError.Valid)
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