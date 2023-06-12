import _config from '../../Config';
import { HTTPClientFactory } from './HTTPClientFactory';

export const factory = new HTTPClientFactory(_config.apiBaseUrl);
