import Fastify, {
    FastifyInstance
} from 'fastify';
import fastifyCookie from "@fastify/cookie";
import {IConfig} from "../config";
import {corsHandler, errorHandler, notFoundPathHandler} from "./utils";
import {AuthUsecase} from "../domain/usecases";
import {AuthRoute} from "./routes/auth.route";

export class HTTPServer {
    private config: IConfig;
    private app: FastifyInstance
    private authUsecase: AuthUsecase

    public constructor(
        conf: IConfig,
        authUsecase: AuthUsecase
    ) {
        this.config = conf;
        this.authUsecase = authUsecase

        this.app = Fastify({
            logger: conf.APP_DEBUG,
        });
    }

    public setup() {
        this.setupHooks()
        this.setupRoutes()
        this.setupUtils()
    }

    public run() {
        this.app.ready(() => {
            this.app.listen(
                {
                    host: this.config.APP_HOST,
                    port: Number(this.config.APP_PORT),
                },
                (err,) => {
                    if (err) {
                        throw err;
                    }
                },
            );
        });
    }

    private setupHooks() {
        this.app.register(fastifyCookie, {
            secret: "secret-cookie",
        })
        this.app.addHook('preHandler', corsHandler);
    }

    private setupUtils() {
        this.app.setNotFoundHandler(notFoundPathHandler);
        this.app.setErrorHandler(errorHandler);
    }

    private setupRoutes() {
        const authRoute = new AuthRoute(this.authUsecase)

        this.app.register(authRoute.router.bind(authRoute))
    }
}


