export class Forbidden extends Error {}

export class HttpError extends Error {}

export class Unauthorized extends Error {}

export class BadRequest extends Error {
    public err: string;
    public code: number;
    public details: number[];

    public constructor(err: string, code: number, details: number[]) {
        super(err);

        this.err = err;
        this.code = code;
        this.details = details;
    }
}
