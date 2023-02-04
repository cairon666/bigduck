import {AuthService} from "../domain/services/auth/auth.service";
import {Config} from "../config";
import express, {Application} from "express";
import * as http from "http";
import {AuthTokenProvider} from "../adapters/authTokenProvider/authTokenProvider";
import {UserRouter} from "./user.router";
import {AuthRouter} from "./auth.router";
import {UserService} from "../domain/services/user/user.service";
import {Logger} from "../../pkg/logger";

export class HTTPServer {
    private authService: AuthService
    private userService: UserService
    private authTokenProvider: AuthTokenProvider
    private config: Config
    private logger: Logger

    private userRouter: UserRouter
    private authRouter: AuthRouter
    public app: Application

    constructor(
        conf: Config,
        logger: Logger,
        AuthTokenProvider: AuthTokenProvider,
        authService: AuthService,
        userService: UserService
    ) {
        this.config = conf
        this.logger = logger
        this.authService = authService
        this.authTokenProvider = AuthTokenProvider
        this.userService = userService

        this.authRouter = new AuthRouter(this.authTokenProvider, this.authService)
        this.userRouter = new UserRouter(this.authTokenProvider, this.userService)

        this.app = express()
    }

    public setup() {
        this.app.use("/api/v1/user", this.userRouter.router())
        this.app.use("/api/v1/auth", this.authRouter.router())
    }

    public run(): http.Server {
        return this.app.listen(this.config.APP.PORT, () => {
            this.logger.info({
                msg: `Server start on ${this.config.APP.PORT}!`
            })
        })
    }
}