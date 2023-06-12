import _config from '../../_config';
import { HTTPClientFactory } from './HTTPClientFactory';

export const factory = new HTTPClientFactory(_config.apiBaseUrl);
export * from './HTTPError';
