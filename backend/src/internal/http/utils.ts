import { Beda } from "../../pkg/beda/Beda";
import { Response } from "express";
import { HttpStatus } from "../../pkg/http-status";
import { CodeError } from "../domain/exceptions/exceptions";

export interface AuthStorageUnit {
    id: string;
    is_admin: boolean;
    is_staff: boolean;
}

export const NameCookieAccess = "accessToken";
export const NameCookieRefresh = "refreshToken";

export function parseAndSendError(e: unknown, resp: Response) {
    if (e instanceof Beda) {
        sendError(
            resp,
            {
                error: e.getTitle(),
                details: e.getDesc(),
                code: e.getCode(),
            },
            HttpStatus.BAD_REQUEST
        );
    } else {
        console.error(e);
        sendError(
            resp,
            {
                error: "Unknown error",
                details: [],
                code: CodeError.Unknown,
            },
            HttpStatus.BAD_REQUEST
        );
    }
}

export interface Error {
    error: string;
    details: string[];
    code: number;
}

export function sendError(resp: Response, err: Error, status: number) {
    resp.status(status);
    resp.json(err);
}

export function sendJson(resp: Response, data: object, status: number) {
    resp.status(status);
    resp.json(data);
}
