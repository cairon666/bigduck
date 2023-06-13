import ky, { HTTPError as KyHTTPError } from 'ky';
import { KyInstance } from 'ky/distribution/types/ky';

import { BadRequest, Forbidden, Internal, Unauthorized, Unknown } from '../errors';
import { ApiOptions, HTTPClient } from './HTTPClient';

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
                    switch (e.response.status) {
                        case 400:
                            throw new BadRequest(e.response, e.request);
                        case 401:
                            throw new Unauthorized(e.response, e.request);
                        case 403:
                            throw new Forbidden(e.response, e.request);
                        case 500:
                            throw new Internal(e.response, e.request);
                        default:
                            throw new Unknown(e.response, e.request);
                    }
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