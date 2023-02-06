import {AuthService} from "../domain/services/auth/auth.service";
import {AuthTokenProvider} from "../adapters/authTokenProvider/authTokenProvider";
import {json, Request, Response, Router} from "express";
import {LoginDTO, RegisterDTO} from "../domain/services/auth/dto";
import {serialize} from "cookie";
import {Beda} from "../../pkg/beda/Beda";
import cookieParser from "cookie-parser";
import {AuthStorageUnit, NameCookieAccess, NameCookieRefresh, parseAndSendError, sendJson} from "./utils";
import {CodeError, Exceptions} from "../domain/exceptions/exceptions";
import {HttpStatus} from "../../pkg/http-status";

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

    public router(): Router {
        const userRoute = Router()

        userRoute.use(json())
        userRoute.use(cookieParser())
        userRoute.post("/api/v1/auth/login", this.loginHandler.bind(this))
        userRoute.post("/api/v1/auth/register", this.registerHandler.bind(this))
        userRoute.post("/api/v1/auth/refresh", this.refreshHandler.bind(this))
        // userRoute.post("/api/v1/auth/refresh/check", this.refreshHandler.bind(this)) TODO

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

            sendJson(resp, {id: authRes.id}, HttpStatus.OK)
        } catch (e) {
            parseAndSendError(e, resp)
        }
        resp.end()
    }

    private async refreshHandler(req: Request, resp: Response): Promise<void> {
        try {
            const cookie = req.cookies.refreshToken
            if (!cookie) {
                throw new Beda(Exceptions.DontHaveRefreshCookie, CodeError.DontHaveRefreshCookie)
            }

            const res = await this.authTokenProvider.refresh(cookie)
            if (!res) {
                throw new Beda(Exceptions.CookieTimeout, CodeError.CookieTimeout)
            }

            resp.setHeader("Set-Cookie", [
                serialize("accessToken", res.accessToken, {
                    path: "/api",
                    maxAge: 60 * 60,
                    // sameSite: "strict",
                    // secure: true,
                    // httpOnly: true,
                }),
                serialize("refreshToken", req.cookies.refreshToken, {
                    path: "/api",
                    maxAge: 1000 * 60 * 15,
                    // sameSite: "strict",
                    // secure: true,
                    // httpOnly: true,
                })])

            resp.status(HttpStatus.NO_CONTENT)
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
                false,
                false,
                req.body.phone,
                req.body.email,
                req.body.username,
                req.body.first_name,
                req.body.second_name,
                req.body.avatar_url,
                req.body.day_of_birth ? new Date(req.body.day_of_birth) : null,
                req.body.gender,
            )

            await this.authService.Register(dto)

            resp.status(HttpStatus.NO_CONTENT)
        } catch (e) {
            parseAndSendError(e, resp)
        }
        resp.end()
    }
}