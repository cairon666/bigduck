export const NotAllowedError = "NotAllowedError"

export enum Exceptions {
    Validate = "validate error",
    LoginRequired = "login is required",
    LoginShort = "login is short",
    PasswordRequired = "password is required",
    PasswordShort = "password is short",
    EmailRequired = "email is required",
    EmailInvalid = "password is invalid",
    FirstNameRequired = "first_name is required",
    FirstNameShort = "first_name is short",
    SecondNameRequired = "second_name is required",
    SecondNameShort = "second_name is short",
    UsernameRequired = "username is required",
    IdOwnerRequired = "id_owner is required",
    UsernameShort = "username is short",
    IdNotUUID = "id is uuid",
    IdRequired = "id is required",
    IdQuizRequired = "id_quiz is required",
    IdQuizMin = "id_quiz is positive",
    Database = "database error",
    NotFound = "not found",
    BadPassword = "bad password",
    DontHaveRefreshCookie = "dont have refresh cookie",
    CookieTimeout = "refresh cookie timeout",
    UnknownDatabase = "unknown error",
    UsernameAlreadyExist = "username already exists",
    NameAlreadyExist = "name already exists",
    NameRequired = "name is required",
    NameShort = "name is short",
    TitleRequired = "title is required",
    LoginAlreadyExist = "login already exists",
    EmailAlreadyExist = "email already exists",
    SomeAlreadyExist = "something already exist",
    PageMin = "page is positive",
    PageRequired = "page is required",
    AccessForbidden = "access forbidden",

}

export enum CodeError {
    Valid,
    Unknown,
    AlreadyExist,
    DontHaveRefreshCookie,
    CookieTimeout,
    InvalidDataType,
    IdRequired,
    NotAllowed,
    Forbidden,
    UnknownDatabase,
    NotFound,
    BadPassword,
    Database,
}