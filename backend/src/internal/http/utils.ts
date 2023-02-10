import { FastifyReply } from 'fastify';

export interface AuthStorageUnit {
    id: string;
    is_admin: boolean;
    is_staff: boolean;
}

export const NameCookieAccess = 'accessToken';
export const NameCookieRefresh = 'refreshToken';

export interface Error {
    error: string;
    details: unknown[];
    code: number;
}

export function sendError(resp: FastifyReply, err: Error, status: number) {
    sendJson(resp, err, status);
}

export function sendJson(reply: FastifyReply, data: object, status: number) {
    reply.status(status).type('application/json').send(data);
}
