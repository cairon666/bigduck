import { ApiOptions, HTTPClient, Methods } from './HTTPClient';

export class FetchHTTPClient implements HTTPClient {
    public async fetch(method: Methods, endpoint: string, opt?: ApiOptions): Promise<Response> {
        const init: RequestInit = {
            method,
            signal: opt?.signal,
            body: opt?.body,
            headers: opt?.headers,
        };

        const params = opt?.params ? `?${opt.params.toString()}` : '';
        const url = `${endpoint}${params}`;

        const resp = await fetch(url, init);

        if (!resp.ok) {
            throw resp;
        }

        return resp;
    }
}
