import {Beda} from "../../pkg/beda/Beda";
import {HTTP_STATUS_BAD_REQUEST} from "../../pkg/http-status";
import {Response} from "express"

export interface AuthStorageUnit {
    id: string
    is_admin: boolean
    is_staff: boolean
}

export const NameCookieAccess = "accessToken"
export const NameCookieRefresh = "refreshToken"

export function parseAndSendError(e: unknown, resp: Response) {
    resp.status(HTTP_STATUS_BAD_REQUEST)

    if (e instanceof Beda) {
        resp.json({
            error: e.getTitle(),
            details: e.getDesc(),
            code: e.getCode(),
        })
    } else if (e instanceof Error) {
        resp.json({
            error: e.message,
            details: [],
        })
    } else {
        resp.json({
            error: "Unknown error",
            details: [],
        })
    }
}

export function sendJson(resp: Response, data: object, status: number) {
    resp.status(status)
    resp.json(data)
}

