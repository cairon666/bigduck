import {Beda} from "../../../../pkg/beda/Beda";
import {InvalidDataTypeError, ValidateError} from "../../exceptions/exceptions";
import {DTO, Filter, Order} from "../types";
import {array, boolean, date, number, object, string, ValidationError} from "yup";
import {CodeError} from "../../exceptions/codes";

export interface IUser {
    id: string
    first_name: string
    second_name: string
    date_create: Date
    date_modify: Date
    is_staff: boolean
    is_admin: boolean
    is_active: boolean
    email: string
    phone?: string
    avatar_url?: string
    bio?: string
}

export interface usersFilter {
    id?: string
    first_name?: string
    second_name?: string
    date_create?: Date
    is_staff?: boolean
    is_admin?: boolean
    is_active?: boolean
    email?: string
    phone?: string
}

export const possibleFiltersPrams = [
    "id",
    "first_name",
    "second_name",
    "date_create",
    "is_staff",
    "is_admin",
    "is_active",
    "email",
    "phone",
]


export class getUsersFilter implements Filter<usersFilter> {
    public id?: string
    public first_name?: string
    public second_name?: string
    public date_create?: Date
    public is_staff?: boolean
    public is_admin?: boolean
    public is_active?: boolean
    public email?: string
    public phone?: string

    public addField(key: string, value: unknown) {
        switch (key) {
            case "id":
            case "first_name":
            case "second_name":
            case "phone":
            case "email": {
                if (typeof value === "string") {
                    this[key] = value
                } else {
                    throw new Beda(InvalidDataTypeError(key), CodeError.InvalidDataType)
                }
                break
            }
            case "is_staff":
            case "is_admin":
            case "is_active": {
                if (value === "true" || value === "false") {
                    this[key] = value === "true"
                } else {
                    throw new Beda(InvalidDataTypeError(key), CodeError.InvalidDataType)
                }
                break
            }
            case "date_create": {
                if (typeof value === "string") {
                    const date = new Date(value)

                    if (date == null) {
                        throw new Beda(InvalidDataTypeError(key), CodeError.InvalidDataType)
                    }

                    this[key] = date
                    break
                }
            }
        }
    }

    public getFields(): usersFilter {
        return {
            id: this.id,
            first_name: this.first_name,
            second_name: this.second_name,
            date_create: this.date_create,
            is_staff: this.is_staff,
            is_admin: this.is_admin,
            is_active: this.is_active,
            email: this.email,
            phone: this.phone,
        }
    }
}

const getUsersSchemeDTO = object({
    page: number()
        .required("page is required")
        .positive("page is positive")
        .min(1, "page start from 1"),
    filter: object({
        id: string()
            .uuid("not valid uuid"),
        first_name: string(),
        second_name: string(),
        date_create: date(),
        is_staff: boolean(),
        is_admin: boolean(),
        is_active: boolean(),
        email: string()
            .email("not valid email"),
        phone: string(),
    })
})

export class getUsersDTO implements DTO {
    public page: number
    public filter: getUsersFilter
    public order: Order<usersFilter>

    constructor(
        page: number,
        order: Order<usersFilter>,
        filter: getUsersFilter
    ) {
        this.page = page
        this.order = order
        this.filter = filter
    }

    isValid() {
        try {
            getUsersSchemeDTO.validateSync({
                page: this.page,
                filter: this.filter,
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

export class getUsersResponseDTO {
    public count: number
    public users: IUser[]

    constructor(count: number, users: IUser[]) {
        this.count = count
        this.users = users
    }
}