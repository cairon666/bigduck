import {date, object, string, ValidationError} from "yup";
import {Beda} from "../../../../pkg/beda/Beda";
import {CodeError, Exceptions} from "../../exceptions/exceptions";

const updateUserScheme = object({
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


export class updateUserDTO {
    public id: string
    public username: string
    public first_name: string
    public second_name: string
    public avatar_url: string | null
    public day_of_birth: Date | null
    public gender: string | null

    constructor(
        id: string,
        username: string,
        first_name: string,
        second_name: string,
        avatar_url: string | null,
        day_of_birth: Date | null,
        gender: string | null,
    ) {
        this.id = id
        this.username = username
        this.first_name = first_name
        this.second_name = second_name
        this.avatar_url = avatar_url
        this.day_of_birth = day_of_birth
        this.gender = gender
    }

    isValid() {
        try {
            updateUserScheme.validateSync(this, {abortEarly: false})
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

const getUserScheme = object({
    id: string()
        .uuid(Exceptions.IdNotUUID)
        .required(Exceptions.IdRequired)
})

export class getUserDTO {
    public id: string

    constructor(
        id: string
    ) {
        this.id = id
    }

    isValid() {
        try {
            getUserScheme.validateSync(this, {abortEarly: false})
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

export interface UserResponse {
    id: string
    username: string
    first_name: string
    second_name: string
    avatar_url: string | null
    day_of_birth: Date | null
    gender: string | null
}

export class getUserRequestDTO {
    public user: UserResponse

    constructor(user: UserResponse) {
        this.user = user
    }
}