import { ApiErrorCodes, ValidateErrorCodes } from '@/shared/HTTPClient/ApiErrorCodes';

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

export interface ApiError {
    message: 'app';
    error: {
        message: string;
        code: ApiErrorCodes;
    }[];
}

export type BadRequestError = ValidateError | ApiError;
