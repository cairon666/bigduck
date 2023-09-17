import { autorun } from 'mobx';
import { __DEV__ } from '@shared/const';
import { sleep } from '@shared/lib/async';
import storage from '@shared/storage';
import httpClient, { Methods } from '../HTTPClient';
import {
    AppErr,
    AppError,
    ForbiddenErr,
    InternalErr,
    NotFoundErr,
    UnauthorizedErr,
    UnknownErr,
    ValidateErr,
    ValidateError,
} from '../HTTPErrs';

interface BaseProviderOpts {
    withAuth?: boolean;
    isJson?: boolean;
    body?: unknown;
}

class BaseProvider {
    private accessToken: string | undefined;

    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
        autorun(() => {
            this.accessToken = storage.accessToken.token;
        });
    }

    public async fetch(method: Methods, endpoint: string, opts?: BaseProviderOpts): Promise<Response> {
        const url = this.baseURL + endpoint;
        const headers: Record<string, string> = {};
        let body: BodyInit | null = null;

        if (opts?.isJson === undefined || opts.isJson) {
            if (!opts?.body) {
                throw new Error('BaseProvider.fetch: body is required then isJson is true');
            }

            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(opts.body);
        }

        if (opts?.withAuth) {
            const { accessToken } = this;

            if (!accessToken) {
                throw new Error('BaseProvider.fetch: accessToken is required then withAuth is true');
            }

            headers.Authorization = `Bearer ${accessToken}`;
        }

        if (__DEV__) {
            console.log({
                url,
                headers,
                body,
            });
            await sleep(2000);
        }

        try {
            const res = await httpClient.fetch(method, url, {
                headers,
                body,
            });
            return res;
        } catch (e: unknown) {
            if (e instanceof Response) {
                switch (e.status) {
                    case 400: {
                        const respJson = await e.json();

                        if (respJson.message === 'app') {
                            throw new AppErr(e, respJson as AppError);
                        } else if (respJson.message === 'validate') {
                            throw new ValidateErr(e, respJson as ValidateError);
                        }

                        throw new Error(`BaseProvider.fetch: unknown message: ${respJson.message}`);
                    }
                    case 401:
                        throw new UnauthorizedErr(e);
                    case 403:
                        throw new ForbiddenErr(e);
                    case 404:
                        throw new NotFoundErr(e);
                    case 500:
                        throw new InternalErr(e);
                    default:
                        throw new UnknownErr(e);
                }
            }

            throw new Error('BaseProvider.fetch: unhandled error');
        }
    }

    public fetchWithAuth(method: Methods, endpoint: string, opts?: BaseProviderOpts): Promise<Response> {
        return this.fetch(method, endpoint, {
            withAuth: true,
            ...opts,
        });
    }
}

export default new BaseProvider(import.meta.env.VITE_BASE_URL);
