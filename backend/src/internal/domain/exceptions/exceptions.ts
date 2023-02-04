export const AuthNotFound = "user not found"
export const AuthBadPassword = "bad password"
export const AuthBadId = "bad id"
export const UnknownError = "unknown error"
export const AlreadyExistError = (column: string) => `${column} already exists`
export const InvalidDataTypeError = (key: string) => `${key} invalid type`
export const ValidateError = "validate error"
export const DontHaveRefreshCookieError = "dont have refresh cookie"
export const RefreshCookieTimeoutError = "refresh cookie timeout"