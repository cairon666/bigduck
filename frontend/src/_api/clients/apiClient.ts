import ky, { HTTPError, Options } from 'ky';
import { KyInstance } from 'ky/distribution/types/ky';

import { Forbidden, HttpError, IApiClient, IHeaders, Unauthorized } from '../types';

export class ApiClient implements IApiClient {
    public constructor(
        private readonly baseURL: string,
        private readonly headers: IHeaders,
        private readonly authToken: string = '',
    ) {}

    public async get(
        endpoint: string,
        params?: URLSearchParams,
        signal?: AbortSignal,
    ): Promise<ReadableStream<Uint8Array> | null> {
        try {
            const client = this.createClient(params);
            const response = await client.get(endpoint, {
                signal: signal,
            });
            return response.body;
        } catch (error: unknown) {
            await this.handleError(error);
            return null;
        }
    }

    public async post(
        endpoint: string,
        data?: BodyInit,
        signal?: AbortSignal,
    ): Promise<ReadableStream<Uint8Array> | null> {
        try {
            const client = this.createClient();
            const response = await client.post(endpoint, {
                body: data,
                signal: signal,
            });
            return response.body;
        } catch (error: unknown) {
            await this.handleError(error);
            return null;
        }
    }

    private createClient(params?: URLSearchParams): KyInstance {
        const config: Options = {
            prefixUrl: this.baseURL,
            headers: this.headers,
            searchParams: params,
        };
        if (this.authToken) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${this.authToken}`,
            };
        }
        return ky.create(config);
    }

    private async handleError(error: unknown): Promise<void> {
        if (error instanceof HTTPError) {
            if (error.response.status === 401) {
                throw new Unauthorized(await error.response.json());
            } else if (error.response.status === 403) {
                throw new Forbidden(await error.response.json());
            } else {
                throw new HttpError(await error.response.json());
            }
        } else {
            throw error;
        }
    }
}
