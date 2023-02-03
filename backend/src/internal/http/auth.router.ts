import {AuthService} from "../domain/services/auth/auth.service";
import {AuthTokenStorage} from "../adapters/authTokenStorage/authTokenStorage";
import * as core from "express-serve-static-core";
import {json, Request, Response, Router} from "express";
import {LoginDTO, RegisterDTO} from "../domain/services/auth/dto";
import {serialize} from "cookie";
import {Beda} from "../../pkg/beda/Beda";
import {AuthStorageUnit, NameCookieAccess, NameCookieRefresh} from "./types";
import cookieParser from "cookie-parser";
import {HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_BAD_UNAUTHORIZED, HTTP_STATUS_NO_CONTENT} from "../../pkg/http-status";

export class AuthRouter {
    private authService: AuthService
    private authStorage: AuthTokenStorage

    constructor(
        authService: AuthService,
        authStorage: AuthTokenStorage
    ) {
        this.authService = authService
        this.authStorage = authStorage
    }

    public router(): core.Router {
        const userRoute = Router()
        userRoute.use(json())
        userRoute.use(cookieParser())
        userRoute.post("/login", this.loginHandler.bind(this))
        userRoute.post("/register", this.registerHandler.bind(this))
        userRoute.post("/refresh", this.refreshHandler.bind(this))

        return userRoute
    }

    private async loginHandler(req: Request, res: Response): Promise<void> {
        try {
            const dto = new LoginDTO(
                req.body.login || "",
                req.body.password || "",
            )

            const authRes = await this.authService.Login(dto)

            const authUnit: AuthStorageUnit = {
                id: authRes.id,
                is_admin: authRes.is_admin,
                is_staff: authRes.is_staff,
            }
            const tokens = await this.authStorage.setNew(JSON.stringify(authUnit))

            res.setHeader("Set-Cookie", [
                serialize(NameCookieAccess, tokens.access, {
                    path: "/",
                    maxAge: 60 * 60,
                    // secure: true,
                    // httpOnly: true,
                }),
                serialize(NameCookieRefresh, tokens.refresh, {
                    path: "/",
                    // secure: true,
                    // httpOnly: true,
                })])
            res.json({
                id: authRes.id,
            })
        } catch (e) {
            if (e instanceof Beda) {
                res.json({
                    error: e.getTitle(),
                    errors: e.getDesc(),
                })
            } else if (e instanceof Error) {
                res.json({
                    error: e.message,
                })
                res.status(HTTP_STATUS_BAD_REQUEST)
            }
        }
        res.end()
    }

    private async refreshHandler(req: Request, resp: Response): Promise<void> {
        try {
            const cookie = req.cookies.refreshToken

            if (!cookie) {
                resp.status(HTTP_STATUS_BAD_REQUEST)
                resp.end()
                return
            }

            const res = await this.authStorage.refresh(cookie)

            if (!res) {
                resp.status(HTTP_STATUS_BAD_REQUEST)
                resp.end()
                return
            }

            resp.setHeader("Set-Cookie", [
                serialize("accessToken", res.accessToken, {
                    path: "/",
                    maxAge: 60 * 60,
                    // secure: true,
                    // httpOnly: true,
                }),
                serialize("refreshToken", req.cookies.refreshToken, {
                    path: "/",
                    maxAge: 1000 * 60 * 15,
                    // secure: true,
                    // httpOnly: true,
                })])

            resp.status(HTTP_STATUS_NO_CONTENT)
        } catch (e) {
            if (e instanceof Error) {
                resp.json({
                    error: e.message,
                })
                resp.status(HTTP_STATUS_BAD_REQUEST)
            }
        }
        resp.end()
    }

    private async registerHandler(req: Request, res: Response): Promise<void> {
        try {
            const dto = new RegisterDTO(
                req.body.login || "",
                req.body.password || "",
                req.body.first_name || "",
                req.body.second_name || "",
                req.body.email || "",
            )

            const authRes = await this.authService.Register(dto)

            res.json({
                id: authRes.id,
            })
        } catch (e) {
            if (e instanceof Beda) {
                res.json({
                    error: e.getTitle(),
                    errors: e.getDesc(),
                })
            } else if (e instanceof Error) {
                res.json({
                    error: e.message,
                })
                res.status(HTTP_STATUS_BAD_REQUEST)
            }
        }
        res.end()
    }
}