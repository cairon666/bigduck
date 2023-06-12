import ky, { HTTPError as KyHTTPError } from 'ky';
import { KyInstance } from 'ky/distribution/types/ky';

import { ApiOptions, HTTPClient } from './HTTPClient';
import { HTTPError } from './HTTPError';

export interface KyApiClientOptions {
    prefixUrl?: string;
    headers?: HeadersInit;
}

export class KyHTTPClient implements HTTPClient {
    private client: KyInstance = ky.create({});

    public constructor(options: KyApiClientOptions) {
        this.client = this.client.extend({
            prefixUrl: options.prefixUrl,
            headers: options.headers,
        });
    }

    private fetch(endpoint: string, method: string, options?: ApiOptions): Promise<Response> {
        let body: undefined | string;
        const headers = new Headers();

        if (options?.body) {
            body = JSON.stringify(options.body);
            headers.set('Content-Type', 'application/json');
        }

        return this.client
            .extend({
                method: method,
                signal: options?.signal,
                body: body,
                headers: headers,
            })(endpoint)
            .catch((e: unknown) => {
                if (e instanceof KyHTTPError) {
                    throw new HTTPError(e.response, e.request);
                }

                throw new Error('Unhandled error when call request!');
            });
    }

    public post(endpoint: string, options?: ApiOptions): Promise<Response> {
        return this.fetch(endpoint, 'POST', options);
    }

    public put(endpoint: string, options?: ApiOptions): Promise<Response> {
        return this.fetch(endpoint, 'PUT', options);
    }

    public get(endpoint: string, options?: ApiOptions): Promise<Response> {
        return this.fetch(endpoint, 'GET', options);
    }

    public delete(endpoint: string, options?: ApiOptions): Promise<Response> {
        return this.fetch(endpoint, 'DELETE', options);
    }
}
