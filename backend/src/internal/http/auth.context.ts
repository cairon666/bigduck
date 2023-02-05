import {AuthStorageUnit} from "./utils";
import {Request} from "express";

export class AuthContext {
    static _bindings = new WeakMap<Request, AuthContext>();

    unit: AuthStorageUnit

    constructor(unit: AuthStorageUnit) {
        this.unit = unit
    }

    static bind(req: Request, unit: AuthStorageUnit): void {
        const ctx = new AuthContext(unit);
        AuthContext._bindings.set(req, ctx);
    }

    static get(req: Request): AuthContext | null {
        return AuthContext._bindings.get(req) || null;
    }
}