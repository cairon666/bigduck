import {Beda} from '../../pkg/beda/Beda';
import {CodeError, Exceptions} from '../domain/exceptions/exceptions';
import {FastifyReply, FastifyRequest} from 'fastify';
import {Jwt, sign, verify} from "jsonwebtoken";
import { v4 } from 'uuid';
import {Forbidden} from "../errors";

export interface AuthStorageUnit {
    id: string;
    is_admin: boolean;
    is_staff: boolean;
}

export const NameCookieRefresh = 'refreshToken';
export const SecretKey = "secret"

export class AuthContext {
    public static _bindings = new WeakMap<FastifyRequest, AuthContext>();

    public unit: AuthStorageUnit;

    public constructor(unit: AuthStorageUnit) {
        this.unit = unit;
    }

    public static bind(req: FastifyRequest, unit: AuthStorageUnit): void {
        const ctx = new AuthContext(unit);
        AuthContext._bindings.set(req, ctx);
    }

    public static get(req: FastifyRequest): AuthContext | null {
        return AuthContext._bindings.get(req) || null;
    }

    // return AuthStorageUnit if access success and throw error if not
    public static checkAccessIdOrAdmin(
        req: FastifyRequest,
        id: string,
    ): AuthStorageUnit {
        const authorization = req.headers.authorization
        if (!authorization) {
            throw new Forbidden();
        }

        const access_token = authorization.split(" ")[1];

        const authUnit = AuthContext.checkIsAuthStorageUnit(access_token)

        if (authUnit.id !== id && !authUnit.is_admin) {
            throw new Forbidden();
        }

        return authUnit;
    }

    public static checkIsAuthStorageUnit(token: string): AuthStorageUnit {
        let decoded: Jwt
        try {
            decoded = verify(token, SecretKey, {
                complete: true
            })
        } catch (e) {
            throw new Forbidden();
        }

        if (typeof decoded.payload === "string") {
            throw new Forbidden();
        }

        if (decoded.payload.id === undefined || decoded.payload.is_admin === undefined || decoded.payload.is_staff === undefined) {
            throw new Forbidden();
        }

        return {
            id: decoded.payload.id,
            is_admin: decoded.payload.is_admin,
            is_staff: decoded.payload.is_staff,
        }
    }

    public static getRefreshCookie(req: FastifyRequest): string {
        const refresh_token = req.cookies[NameCookieRefresh]
        if (!refresh_token) {
            throw new Beda(Exceptions.DontHaveRefreshCookie, CodeError.DontHaveRefreshCookie)
        }
        return refresh_token
    }

    public static setRefreshCookie(reply: FastifyReply, refresh_token: string) {
        reply.setCookie(NameCookieRefresh, refresh_token, {
            path: '/',
            // domain: "localhost",
            maxAge: 60 * 60 * 24 * 30,
            // domain: "localhost",
            // httpOnly: true,
            // secure: true,
            // httpOnly: true,
            // sameSite: "none"
        });
    }

    public static generateRefreshToken(authUnit: AuthStorageUnit): string {
        return sign(authUnit, 'secret', {
            expiresIn: '30d',
            jwtid: v4(),
        });
    }

    public static generateAccessToken(authUnit: AuthStorageUnit): string {
        return sign(authUnit, 'secret', {
            expiresIn: '1h',
            jwtid: v4(),
        });
    }
}
