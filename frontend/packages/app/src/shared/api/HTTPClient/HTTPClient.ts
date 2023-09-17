export interface ApiOptions {
    params?: URLSearchParams;
    signal?: AbortSignal;
    body?: BodyInit | null;
    headers?: Record<string, string>;
}

export type Methods = 'GET' | 'POST' | 'HEAD' | 'OPTIONS' | 'PUT' | 'PATCH' | 'DELETE';

export interface HTTPClient {
    fetch(methods: Methods, endpoint: string, opt?: ApiOptions): Promise<Response>;
}
