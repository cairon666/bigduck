export const AuthNotFound = "user not found"
export const AuthBadPassword = "bad password"
export const AuthBadId = "bad id"
export const UnknownError = "unknown error"
export const AlreadyExistError = (column: string) => `${column} already exists`
export const InvalidDataTypeError = (key: string) => `${key} invalid type`
export const ValidateError = ""
export const IdRequiredError = "Id required error"
export const NotAllowedError = "NotAllowedError"
export const ForbiddenError = "Forbidden"

export enum Exceptions {
    RegisterLoginRequired = "login is required",
    RegisterLoginShort = "login is short",
    RegisterPasswordRequired = "password is required",
    RegisterPasswordShort = "password is short",
    RegisterEmailRequired = "email is required",
    RegisterEmailInvalid = "password is invalid",
    RegisterFirstNameRequired = "first_name is required",
    RegisterFirstNameShort = "first_name is short",
    RegisterSecondNameRequired = "second_name is required",
    RegisterSecondNameShort = "second_name is short",
    RegisterUsernameRequired = "username is required",
    RegisterUsernameShort = "username is short",
    RegisterDatabase = "database error",

    LoginDatabase = "database error",
    LoginNotFound = "not found",
    LoginBadPassword = "bad password",

    RefreshDontHaveRefreshCookie = "dont have refresh cookie",
    RefreshCookieTimeout = "refresh cookie timeout",

    Validate = "validate error",

    UnknownDatabase = "unknown error"
}