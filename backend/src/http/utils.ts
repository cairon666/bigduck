import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { Access, AlreadyExist, Database, Validate } from '../errors';

export function sendJSON(reply: FastifyReply, status: number, data: object) {
    reply.status(status).send(data);
}

export async function notFoundPathHandler(
    req: FastifyRequest,
    reply: FastifyReply,
) {
    reply.status(StatusCodes.NOT_FOUND).send();
}

export async function errorHandler(
    error: unknown,
    req: FastifyRequest,
    reply: FastifyReply,
) {
    if (error instanceof Access) {
    } else if (error instanceof Database) {
    } else if (error instanceof Validate) {
    } else if (error instanceof AlreadyExist) {
        reply.status(StatusCodes.BAD_REQUEST).send({
            already_exist: error.message,
        });
    } else {
        reply.status(StatusCodes.BAD_REQUEST).send();
    }
    console.error(error)
}

export async function corsHandler(_: FastifyRequest, reply: FastifyReply) {
    reply.header('Access-Control-Allow-Origin', '*');
    reply.header('Access-Control-Allow-Methods', '*');
    reply.header('Access-Control-Allow-Headers', '*');
    reply.header('Access-Control-Allow-Credentials', 'true');
    reply.header('Access-Control-Expose-Headers', 'Set-Cookie');
}
