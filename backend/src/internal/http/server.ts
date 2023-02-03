import {AuthService} from "../domain/services/auth/auth.service";
import {Config} from "../config";
import express, {Request, Response} from "express";
import * as http from "http";
import {LoginDTO, RegisterDTO} from "../domain/services/auth/dto";
import {Beda} from "../../pkg/beda/Beda";
import {serialize} from "cookie";
import {AuthTokenStorage} from "../adapters/authTokenStorage/authTokenStorage";

export class HTTPServer {
    private authService: AuthService
    private authStorage: AuthTokenStorage
    private config: Config

    constructor(
        conf: Config,
        authService: AuthService,
        authStorage: AuthTokenStorage
    ) {
        this.config = conf
        this.authService = authService
        this.authStorage = authStorage
    }

    public run(): http.Server {
        const app: express.Application = express()


        app.use(express.json())


        if (this.config.APP.DEBUG) {
            // error handler
        }

        app.post("/api/v1/auth/login", this.loginHandler.bind(this))
        app.post("/api/v1/auth/register", this.registerHandler.bind(this))

        return app.listen(this.config.APP.PORT, () => {
            console.log(`Server start on ${this.config.APP.PORT}!`)
        })
    }

    private async loginHandler(req: Request, res: Response): Promise<void> {
        try {
            const dto = new LoginDTO(
                req.body.login || "",
                req.body.password || "",
            )

            const authRes = await this.authService.Login(dto)

            const tokens = await this.authStorage.setNew(JSON.stringify({
                id: authRes.id,
                time: Date.now(),
                is_admin: authRes.is_admin,
                is_staff: authRes.is_staff,
            }))

            res.setHeader("Set-Cookie", [
                serialize("accessToken", tokens.access, {
                    path: "/",
                    maxAge: 60 * 60,
                    // secure: true,
                    // httpOnly: true,
                }),
                serialize("refreshToken", tokens.refresh, {
                    path: "/",
                    maxAge: 1000 * 60 * 15,
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
            }
        }
        res.end()
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
            }
        }
        res.end()
    }
}