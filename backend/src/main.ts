import {LoadEnv} from "./internal/config";
import "reflect-metadata"
import {NewDataSource} from "./internal/db/postgres";
import {HTTPServer} from "./internal/http/server";
import {AuthService} from "./internal/domain/services/auth/auth.service";
import {RedisController} from "./internal/db/redis";
import {AuthTokenStorage} from "./internal/adapters/authTokenStorage/authTokenStorage";

(async () => {
    const config = LoadEnv()

    const redisController = new RedisController(config, 0)
    await redisController.connect()

    const authTokenStorage = new AuthTokenStorage(redisController)

    const postgresClient = await NewDataSource(config)
    const managerStorage = await postgresClient.manager
    const authService = new AuthService(
        managerStorage
    )

    const server = new HTTPServer(
        config,
        authService,
        authTokenStorage
    )

    server.run()
})()