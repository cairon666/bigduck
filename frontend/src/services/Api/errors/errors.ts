import { HTTPError } from './HTTPError';

// 400. Если оишбкуа представляет собой BadRequest, content будет
// иметь вид ApiError ВСЕГДА.
export class BadRequest extends HTTPError {}

// 401
export class Unauthorized extends HTTPError {}

// 403
export class Forbidden extends HTTPError {}

// 500
export class Internal extends HTTPError {}

// unknown
export class Unknown extends HTTPError {}
