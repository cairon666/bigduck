export interface ApiOptions {
    params?: URLSearchParams;
    signal?: AbortSignal;
    body?: unknown;
}

// HTTPClient - interface client for http requests.
// Should except HTTPError.
export interface HTTPClient {
    post(endpoint: string, opt?: ApiOptions): Promise<Response>;

    get(endpoint: string, opt?: ApiOptions): Promise<Response>;

    put(endpoint: string, opt?: ApiOptions): Promise<Response>;

    delete(endpoint: string, opt?: ApiOptions): Promise<Response>;
}
