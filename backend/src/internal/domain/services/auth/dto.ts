import {Beda} from "../../../../pkg/beda/Beda";
import {CodeError} from "../../exceptions/codes";
import {ValidateError} from "../../exceptions/exceptions";
import {object, string, ValidationError} from "yup";

const registerSchemeDTO = object({
    login: string()
        .required("login is required")
        .min(4, "short login"),
    password: string()
        .required("password is required")
        .min(4, "short password"),
    first_name: string()
        .required("first_name is required")
        .min(4, "short first_name"),
    second_name: string()
        .required("second_name is required")
        .min(4, "short second_name"),
    email: string()
        .required("email is required")
        .email("invalid email"),
})

export class RegisterDTO {
    login: string
    password: string
    first_name: string
    second_name: string
    email: string

    constructor(
        login: string,
        password: string,
        first_name: string,
        second_name: string,
        email: string,
    ) {
        this.login = login
        this.password = password
        this.first_name = first_name
        this.second_name = second_name
        this.email = email
    }

    isValid() {
        try {
            registerSchemeDTO.validateSync({
                login: this.login,
                password: this.password,
                first_name: this.first_name,
                second_name: this.second_name,
                email: this.email,
            }, {
                abortEarly: false,
            })
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

export class RegisterResponseDTO {
    public id: string

    constructor(id: string) {
        this.id = id
    }
}

const loginShemeDTO = object({
    login: string()
        .required("login is required")
        .min(4, "short login"),
    password: string()
        .required("password is required")
        .min(4, "short password"),
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
            loginShemeDTO.validateSync({
                login: this.login,
                password: this.password,
            }, {
                abortEarly: false,
            })
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
        is_admin: boolean
    ) {
        this.id = id
        this.is_staff = is_staff
        this.is_admin = is_admin
    }
}