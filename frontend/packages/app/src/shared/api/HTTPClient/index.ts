import { FetchHTTPClient } from './FetchHTTPClient';
import { HTTPClient } from './HTTPClient';

const httpClient: HTTPClient = new FetchHTTPClient();
export default httpClient;

export * from './HTTPClient';
