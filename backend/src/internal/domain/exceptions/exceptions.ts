export enum CodeError {
    Unknown = 1,
    Valid,
    DontHaveRefreshCookie,
    CookieTimeout,
    Forbidden,
    Database,
    AuthBadPassword
}

export const Exceptions = {
    Validate: 'validate error',
    Database: 'database error',
    DontHaveRefreshCookie: 'dont have refresh cookie',
    CookieTimeout: 'refresh cookie timeout',
    AccessForbidden: 'access forbidden',
};

