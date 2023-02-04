import {LoadEnv} from "./internal/config";
import {RedisController} from "./internal/db/redis";
import {NewDataSource} from "./internal/db/postgres";
import {AuthTokenProvider} from "./internal/adapters/authTokenProvider/authTokenProvider";
import {AuthService} from "./internal/domain/services/auth/auth.service";
import {User} from "./internal/db/postgres/user.models";
import {UserService} from "./internal/domain/services/user/user.service";
import {HTTPServer} from "./internal/http/server";
import {format, createLogger, transports} from "winston";
import {Logger} from "./pkg/logger";

async function bootstrap() {
    const config = LoadEnv()

    const loggerW = createLogger({
        level: 'info',
        format: format.json(),
        defaultMeta: { service: 'backend' },
        transports: [
            // new transports.Console({
            //     format: format.json(),
            //     level: "info"
            // })
        ],
    });

    if (config.APP.DEBUG) {
        loggerW.add(new transports.Console({
            format: format.json(),
            level: "debug",
        }));
    }

    const logger = new Logger(loggerW)

    logger.info({
        msg: "connect redis"
    })
    const redisController = new RedisController(config, 0)
    await redisController.connect()

    logger.info({
        msg: "connect postgres"
    })
    const postgresClient = await NewDataSource(config)
    const managerStorage = await postgresClient.manager

    logger.info({
        msg: "create auth token storage"
    })
    const authTokenProvider = new AuthTokenProvider(redisController)

    logger.info({
        msg: "create auth service"
    })
    const authService = new AuthService(
        logger,
        managerStorage
    )

    logger.info({
        msg: "create user service"
    })
    const userStorage = await postgresClient.getRepository(User)
    const userService = new UserService(userStorage)

    logger.info({
        msg: "create http server"
    })
    const server = new HTTPServer(
        config,
        logger,
        authTokenProvider,
        authService,
        userService
    )

    server.setup()
    server.run()
}

bootstrap();