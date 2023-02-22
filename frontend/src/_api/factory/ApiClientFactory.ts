import { ApiClient } from '../clients';
import { IApiClient, IHeaders } from '../types';

export class ApiClientFactory {
    public constructor(private readonly baseURL: string, private readonly headers: IHeaders = {}) {}

    public createClient(): IApiClient {
        return new ApiClient(this.baseURL, this.headers);
    }

    public createAuthorizedClient(authToken: string): IApiClient {
        return new ApiClient(this.baseURL, this.headers, authToken);
    }
}
