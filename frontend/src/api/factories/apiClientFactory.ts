import { ApiClient } from '../clients';
import { ApiHeaders } from '../types';

export class ApiClientFactory {
    private readonly baseUrl: string;
    private readonly headers: ApiHeaders = {};

    public constructor(baseUrl: string, headers: ApiHeaders = {}) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    public createClient(): ApiClient {
        return new ApiClient(this.baseUrl, this.headers);
    }

    public createAuthorizedClient(authToken: string): ApiClient {
        return new ApiClient(this.baseUrl, this.headers, authToken);
    }
}
