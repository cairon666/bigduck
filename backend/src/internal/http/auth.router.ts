import {AuthService} from "../domain/services/auth/auth.service";
import {AuthTokenProvider} from "../adapters/authTokenProvider/authTokenProvider";
import * as core from "express-serve-static-core";
import {json, Request, Response, Router} from "express";
import {LoginDTO, RegisterDTO} from "../domain/services/auth/dto";
import {serialize} from "cookie";
import {Beda} from "../../pkg/beda/Beda";
import cookieParser from "cookie-parser";
import {HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_NO_CONTENT, HTTP_STATUS_OK} from "../../pkg/http-status";
import {AuthStorageUnit, NameCookieAccess, NameCookieRefresh, parseAndSendError, sendJson} from "./utils";
import {CodeError} from "../domain/exceptions/codes";
import {DontHaveRefreshCookieError, RefreshCookieTimeoutError} from "../domain/exceptions/exceptions";

export class AuthRouter {
    private authService: AuthService
    private authTokenProvider: AuthTokenProvider

    constructor(
        authTokenProvider: AuthTokenProvider,
        authService: AuthService,
    ) {
        this.authService = authService
        this.authTokenProvider = authTokenProvider
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

    private async loginHandler(req: Request, resp: Response): Promise<void> {
        try {
            const dto = new LoginDTO(
                req.body.login,
                req.body.password,
            )

            const authRes = await this.authService.Login(dto)

            const authUnit: AuthStorageUnit = {
                id: authRes.id,
                is_admin: authRes.is_admin,
                is_staff: authRes.is_staff,
            }
            const tokens = await this.authTokenProvider.setNew(JSON.stringify(authUnit))

            resp.setHeader("Set-Cookie", [
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

            sendJson(resp, {id: authRes.id}, HTTP_STATUS_OK)

        } catch (e) {
            parseAndSendError(e, resp)
        }
        resp.end()
    }

    private async refreshHandler(req: Request, resp: Response): Promise<void> {
        try {
            const cookie = req.cookies.refreshToken

            if (!cookie) {
                throw new Beda(DontHaveRefreshCookieError, CodeError.DontHaveRefreshCookie)
            }

            const res = await this.authTokenProvider.refresh(cookie)

            if (!res) {
                throw new Beda(RefreshCookieTimeoutError, CodeError.RefreshCookieTimeout)
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
            parseAndSendError(e, resp)
        }
        resp.end()
    }

    private async registerHandler(req: Request, resp: Response): Promise<void> {
        try {
            const dto = new RegisterDTO(
                req.body.login,
                req.body.password,
                req.body.first_name,
                req.body.second_name,
                req.body.email,
            )

            const authRes = await this.authService.Register(dto)

            sendJson(resp, {id: authRes.id}, HTTP_STATUS_OK)
        } catch (e) {
            parseAndSendError(e, resp)
        }
        resp.end()
    }
}