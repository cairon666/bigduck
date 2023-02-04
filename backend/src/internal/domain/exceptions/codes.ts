import {InvalidDataTypeError} from "./exceptions";

export enum CodeError {
    Valid,
    Unknown,
    AlreadyExist,
    AuthNotFound,
    AuthBadPassword,
    AuthBadId,
    DontHaveRefreshCookie,
    RefreshCookieTimeout,
    InvalidDataType
}