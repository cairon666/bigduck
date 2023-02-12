import {
    BadRequest,
    Forbidden,
    HttpError,
    Unauthorized,
} from '../errors/errors';
import { KyInstance } from 'ky/distribution/types/ky';
import ky, { HTTPError, KyResponse } from 'ky';
import { Options, SearchParamsOption } from 'ky/distribution/types/options';
import { ApiClientInterface, ApiHeaders } from '../types';

export class ApiClient implements ApiClientInterface {
    private readonly baseUrl: string;
    private readonly headers: ApiHeaders;
    private readonly authToken: string;

    constructor(baseUrl: string, headers: ApiHeaders, authToken: string = '') {
        this.baseUrl = baseUrl;
        this.headers = headers;
        this.authToken = authToken;
    }

    public async get(
        endpoint: string = '',
        params?: SearchParamsOption,
        signal?: AbortSignal,
    ): Promise<any> {
        try {
            const client = this.createClient(params);
            return await client.get(endpoint, {
                signal: signal,
                searchParams: params,
                credentials: 'include',
            });
        } catch (error: any) {
            throw await this.handleError(error);
        }
    }

    public async post(
        endpoint: string = '',
        data?: object,
        signal?: AbortSignal,
    ): Promise<KyResponse> {
        try {
            const client = this.createClient();
            return await client.post(endpoint, {
                signal: signal,
                json: data,
                credentials: 'include',
            });
        } catch (error) {
            throw await this.handleError(error);
        }
    }

    public async uploadFile(
        endpoint: string = '',
        formData: FormData,
    ): Promise<KyResponse> {
        try {
            const client = this.createClient();
            return await client.post(endpoint, {
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        } catch (error) {
            throw await this.handleError(error);
        }
    }

    private createClient(params: SearchParamsOption = {}): KyInstance {
        const config: Options = {
            prefixUrl: this.baseUrl,
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

    async handleError(error: unknown): Promise<Error> {
        if (error instanceof HTTPError) {
            switch (error.response.status) {
                case 401:
                    return new Unauthorized(await error.response.json());
                case 403:
                    return new Forbidden(await error.response.json());
                case 400:
                    const json = await error.response.json();
                    return new BadRequest(json.err, json.code, json.details);
                default:
                    return new HttpError(await error.response.json());
            }
        }

        return error as Error;
    }
}
