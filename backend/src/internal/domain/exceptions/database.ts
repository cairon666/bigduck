export enum DatabaseCodes {
    LoginAlreadyExist = 1,
    EmailAlreadyExist,
    NameAlreadyExist,
    UsernameAlreadyExist,
    SomeAlreadyExist,
    NotFound,
    Unknown,
    AuthBadPassword
}

export const DatabaseErrors: Record<DatabaseCodes, string> = {
    [DatabaseCodes.LoginAlreadyExist]: "login already exists",
    [DatabaseCodes.EmailAlreadyExist]: "email already exists",
    [DatabaseCodes.NameAlreadyExist]: "name already exists",
    [DatabaseCodes.UsernameAlreadyExist]: "username already exists",
    [DatabaseCodes.SomeAlreadyExist]: 'something already exist',
    [DatabaseCodes.NotFound]: "not found",
    [DatabaseCodes.Unknown]: 'unknown error',
    [DatabaseCodes.AuthBadPassword]: "bad password"
}
