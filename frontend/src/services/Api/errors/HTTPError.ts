export class HTTPError extends Error {
    public response: Response;
    public request: Request;

    public constructor(response: Response, request: Request) {
        super();
        this.response = response;
        this.request = request;
    }
}
