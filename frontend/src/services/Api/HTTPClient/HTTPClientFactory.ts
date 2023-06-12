import { HTTPClient } from './HTTPClient';
import { KyHTTPClient } from './KyHTTPClient';

export class HTTPClientFactory {
    public constructor(private prefixUrl: string) {}

    public createClient(): HTTPClient {
        return new KyHTTPClient({
            prefixUrl: this.prefixUrl,
        });
    }

    public createAuthorizedClient(accessToken: string): HTTPClient {
        return new KyHTTPClient({
            prefixUrl: this.prefixUrl,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    }
}
