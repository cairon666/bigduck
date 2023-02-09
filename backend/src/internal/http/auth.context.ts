import { AuthStorageUnit } from './utils';
import { Request } from 'express';
import { Beda } from '../../pkg/beda/Beda';
import { CodeError, Exceptions } from '../domain/exceptions/exceptions';

export class AuthContext {
    public static _bindings = new WeakMap<Request, AuthContext>();

    public unit: AuthStorageUnit;

    public constructor(unit: AuthStorageUnit) {
        this.unit = unit;
    }

    public static bind(req: Request, unit: AuthStorageUnit): void {
        const ctx = new AuthContext(unit);
        AuthContext._bindings.set(req, ctx);
    }

    public static get(req: Request): AuthContext | null {
        return AuthContext._bindings.get(req) || null;
    }

    // return AuthStorageUnit if access success and throw error if not
    public static checkAccessIdOrAdmin(
        req: Request,
        id: string,
    ): AuthStorageUnit {
        const authUnit = AuthContext.get(req)?.unit;

        if (authUnit && (authUnit.id === id || authUnit.is_admin)) {
            return authUnit;
        }
        throw new Beda(Exceptions.AccessForbidden, CodeError.Forbidden);
    }
}