import { BadRequestError } from "@/shared/HTTPClient/ApiError";

export class HTTPErr extends Error {
    public response: Response;
    public request: Request;

    public constructor(response: Response, request: Request) {
        super("HTTP Error");
        this.response = response;
        this.request = request;
    }
}

export class BadRequestErr extends HTTPErr {
    public parseApiError(): Promise<BadRequestError> {
        return this.response.json();
    }
}

// 401
export class UnauthorizedErr extends HTTPErr {}

// 403
export class ForbiddenErr extends HTTPErr {}

// 500
export class InternalErr extends HTTPErr {}

// unknown
export class UnknownErr extends HTTPErr {}
