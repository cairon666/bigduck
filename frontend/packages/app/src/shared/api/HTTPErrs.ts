import { AppErrorCodes, ValidateErrorCodes } from './HTTPCodes';

export class HTTPErr extends Error {
    public response: Response;

    public constructor(response: Response) {
        super('HTTP Error');
        this.response = response;
    }
}

export interface AppError {
    message: 'app';
    error: {
        message: string;
        code: AppErrorCodes;
    };
}

// 400: app logic error
export class AppErr extends HTTPErr {
    private _json: AppError;

    get json(): Promise<AppError> {
        return Promise.resolve(this._json);
    }

    constructor(response: Response, json: AppError) {
        super(response);
        this._json = json;
    }
}

export interface ValidateError {
    message: 'validate';
    validate: Record<
        string,
        {
            message: string;
            code: ValidateErrorCodes;
        }
    >;
}

// 400: validate error
export class ValidateErr extends HTTPErr {
    private _json: ValidateError;

    get json(): Promise<ValidateError> {
        return Promise.resolve(this._json);
    }

    constructor(response: Response, json: ValidateError) {
        super(response);
        this._json = json;
    }
}

// 401
export class UnauthorizedErr extends HTTPErr {}

// 403
export class ForbiddenErr extends HTTPErr {}

// 404
export class NotFoundErr extends HTTPErr {}

// 500
export class InternalErr extends HTTPErr {}

// unknown
export class UnknownErr extends HTTPErr {}
