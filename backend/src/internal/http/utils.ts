import { Beda } from '../../pkg/beda/Beda';
import { Response } from 'express';
import { HttpStatus } from '../../pkg/http-status';
import { CodeError } from '../domain/exceptions/exceptions';
import { FastifyReply } from 'fastify';

export interface AuthStorageUnit {
    id: string;
    is_admin: boolean;
    is_staff: boolean;
}

export const NameCookieAccess = 'accessToken';
export const NameCookieRefresh = 'refreshToken';

export function parseAndSendError(e: unknown, reply: FastifyReply) {
    if (e instanceof Beda) {
        sendError(
            reply,
            {
                error: e.getTitle(),
                details: e.getDesc(),
                code: e.getCode(),
            },
            HttpStatus.BAD_REQUEST,
        );
    } else {
        console.error(e);
        sendError(
            reply,
            {
                error: 'Unknown error',
                details: [],
                code: CodeError.Unknown,
            },
            HttpStatus.BAD_REQUEST,
        );
    }
}

export interface Error {
    error: string;
    details: string[];
    code: number;
}

export function sendError(resp: FastifyReply, err: Error, status: number) {
    sendJson(resp, err, status);
}

export function sendJson(reply: FastifyReply, data: object, status: number) {
    reply.status(status).send(data);
}
