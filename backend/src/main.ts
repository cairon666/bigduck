import {LoadEnv} from './internal/config';
import {RedisController} from './internal/db/redis';
import {NewDataSource} from './internal/db/postgres';
import {AuthTokenProvider} from './internal/adapters/authTokenProvider/authTokenProvider';
import {AuthService} from './internal/domain/services/auth/auth.service';
import {UserDB} from './internal/db/postgres/user.models';
import {HTTPServer} from './internal/http/server';
import {NewDevLogger} from './pkg/logger';
import {UserService} from './internal/domain/services/user/user.service';
import {QuizService} from './internal/domain/services/quiz/quiz.service';
import {Quizzes} from './internal/db/postgres/quizzes.models';
import {Question} from './internal/db/postgres/questions.models';
import {QuestionService} from './internal/domain/services/question/question.service';
import cluster from 'cluster';
import * as os from 'os';
import {UserStorage} from "./internal/adapters/userStorage/userStorage";
import {AuthStorage} from "./internal/adapters/authStorage/authStorage";

async function bootstrap() {
    const config = LoadEnv();
    const logger = NewDevLogger();

    logger.info({msg: 'connect redis'});
    const redisController = new RedisController(config, 0);
    await redisController.connect();

    logger.info({msg: 'connect postgres'});
    const postgresClient = await NewDataSource(config);

    logger.info({msg: 'create auth token storage'});
    const authTokenProvider = new AuthTokenProvider(redisController);

    logger.info({msg: 'create auth service'});
    const authStorage = new AuthStorage(logger, postgresClient.manager)
    const authService = new AuthService(authStorage);

    logger.info({msg: 'create user service'});
    const userStorage = new UserStorage(logger, postgresClient.getRepository(UserDB))
    const userService = new UserService(userStorage);

    logger.info({msg: 'create quiz service'});
    const quizStorage = await postgresClient.getRepository(Quizzes);
    const quizService = new QuizService(logger, quizStorage);

    logger.info({msg: 'create question service'});
    const questionStorage = await postgresClient.getRepository(Question);
    const questionService = new QuestionService(logger, questionStorage);

    logger.info({msg: 'create http server'});
    const server = new HTTPServer(
        config,
        logger,
        authTokenProvider,
        authService,
        userService,
        quizService,
        questionService,
    );

    server.setup();
    server.run();
}

if (process.env.NODE_ENV === 'development') {
    bootstrap();
} else {
    const numCPUs = os.cpus().length >= 5 ? 5 : os.cpus().length;

    if (cluster.isMaster) {
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }

        cluster.on('online', function (worker) {
            console.log('Worker ' + worker.process.pid + ' is online');
        });

        cluster.on('exit', function (worker, code, signal) {
            console.log(
                'Worker ' +
                worker.process.pid +
                ' died with code: ' +
                code +
                ', and signal: ' +
                signal,
            );
            console.log('Starting a new worker');
            cluster.fork();
        });
    } else {
        // @ts-ignore
        bootstrap();
    }
}
