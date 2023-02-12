import { FastifyReply } from 'fastify';


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
