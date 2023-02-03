import {Beda} from "../../../../pkg/beda/Beda";

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
        const err = new Beda("validate")

        if (this.login == "") {
            err.addDesc("empty login")
        }

        if (this.password == "") {
            err.addDesc("empty password")
        }

        if (this.first_name == "") {
            err.addDesc("empty first_name")
        }

        if (this.second_name == "") {
            err.addDesc("empty second_name")
        }


        if (this.email == "") {
            err.addDesc("empty email")
        }


        if (!err.isEmpty()) {
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

export class LoginDTO {
    public login: string
    public password: string

    constructor(login: string, password: string) {
        this.login = login
        this.password = password
    }

    isValid() {
        const err = new Beda("validate")
        if (this.login == "") {
            err.addDesc("empty login")
        }

        if (this.password == "") {
            err.addDesc("empty password")
        }

        if (!err.isEmpty()) {
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