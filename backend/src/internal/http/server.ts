import {AuthService} from "../domain/services/auth/auth.service";
import {Config} from "../config";
import express, {Application} from "express";
import * as http from "http";
import {AuthTokenStorage} from "../adapters/authTokenStorage/authTokenStorage";
import {UserRouter} from "./user.router";
import {AuthRouter} from "./auth.router";

export class HTTPServer {
    private authService: AuthService
    private authStorage: AuthTokenStorage
    private config: Config

    private userRouter: UserRouter
    private authRouter: AuthRouter
    public app: Application

    constructor(
        conf: Config,
        authService: AuthService,
        authStorage: AuthTokenStorage
    ) {
        this.config = conf
        this.authService = authService
        this.authStorage = authStorage

        this.userRouter = new UserRouter(this.authStorage)
        this.authRouter = new AuthRouter(this.authService, this.authStorage)

        this.app = express()
    }

    public setup() {
        if (this.config.APP.DEBUG) {
            // error handler
        }

        this.app.use("/api/v1/user", this.userRouter.router())
        this.app.use("/api/v1/auth", this.authRouter.router())
    }

    public run(): http.Server {
        return this.app.listen(this.config.APP.PORT, () => {
            console.log(`Server start on ${this.config.APP.PORT}!`)
        })
    }
}