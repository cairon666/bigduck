import {AuthService} from "../domain/services/auth/auth.service";
import {Config} from "../config";
import express, {Application, NextFunction, Request, Response} from "express";
import * as http from "http";
import {AuthTokenProvider} from "../adapters/authTokenProvider/authTokenProvider";
import {AuthRouter} from "./auth.router";
import {Logger} from "../../pkg/logger";
import {parseAndSendError} from "./utils";

export class HTTPServer {
    private authService: AuthService
    private authTokenProvider: AuthTokenProvider
    private config: Config
    private logger: Logger

    private authRouter: AuthRouter
    public app: Application

    constructor(
        conf: Config,
        logger: Logger,
        AuthTokenProvider: AuthTokenProvider,
        authService: AuthService,
    ) {
        this.config = conf
        this.logger = logger
        this.authService = authService
        this.authTokenProvider = AuthTokenProvider

        this.authRouter = new AuthRouter(this.authTokenProvider, this.authService)

        this.app = express()
    }

    public setup() {
        this.app.use("", this.authRouter.router())
    }

    public run(): http.Server {
        return this.app.listen(this.config.APP.PORT, () => {
            this.logger.info({
                msg: `Server start on ${this.config.APP.PORT}!`
            })
        })
    }
}