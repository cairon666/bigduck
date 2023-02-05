import {LoadEnv} from "./internal/config";
import {RedisController} from "./internal/db/redis";
import {NewDataSource} from "./internal/db/postgres";
import {AuthTokenProvider} from "./internal/adapters/authTokenProvider/authTokenProvider";
import {AuthService} from "./internal/domain/services/auth/auth.service";
import {User} from "./internal/db/postgres/user.models";
import {HTTPServer} from "./internal/http/server";
import { NewDevLogger} from "./pkg/logger";

async function bootstrap() {
    const config = LoadEnv()
    const logger = NewDevLogger()

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

    logger.info({
        msg: "create http server"
    })
    const server = new HTTPServer(
        config,
        logger,
        authTokenProvider,
        authService,
    )

    server.setup()
    server.run()
}

bootstrap();