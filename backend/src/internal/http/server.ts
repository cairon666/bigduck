import { AuthService } from '../domain/services/auth/auth.service';
import { Config } from '../config';
import express, { Application, NextFunction, Request, Response } from 'express';
import * as http from 'http';
import { AuthTokenProvider } from '../adapters/authTokenProvider/authTokenProvider';
import { AuthRouter } from './auth.router';
import { Logger } from '../../pkg/logger';
import { UserService } from '../domain/services/user/user.service';
import { UserRouter } from './user.router';
import cookieParser from 'cookie-parser';
import { AuthStorageUnit, NameCookieAccess } from './utils';
import { AuthContext } from './auth.context';
import { QuizService } from '../domain/services/quiz/quiz.service';
import { QuizRouter } from './quiz.router';
import { QuestionRouter } from './question.router';
import { QuestionService } from '../domain/services/question/question.service';

export class HTTPServer {
    private config: Config;
    private logger: Logger;

    // service
    private authService: AuthService;
    private authTokenProvider: AuthTokenProvider;
    private userService: UserService;
    private quizService: QuizService;
    private questionService: QuestionService;

    // routes
    private authRouter: AuthRouter;
    private userRouter: UserRouter;
    private quizRouter: QuizRouter;
    private questionRouter: QuestionRouter;

    // public app for tests
    public app: Application;

    public constructor(
        conf: Config,
        logger: Logger,
        AuthTokenProvider: AuthTokenProvider,
        authService: AuthService,
        userService: UserService,
        quizService: QuizService,
        questionService: QuestionService,
    ) {
        this.config = conf;
        this.logger = logger;

        // service
        this.authService = authService;
        this.authTokenProvider = AuthTokenProvider;
        this.userService = userService;
        this.quizService = quizService;
        this.questionService = questionService;

        // routes
        this.userRouter = new UserRouter(this.userService);
        this.authRouter = new AuthRouter(
            this.authTokenProvider,
            this.authService,
        );
        this.quizRouter = new QuizRouter(this.quizService);
        this.questionRouter = new QuestionRouter(this.questionService);

        this.app = express();
    }

    public setup() {
        this.app.use(cookieParser());
        this.app.use('', this.authCookieMiddleware.bind(this));
        this.app.use('', this.userRouter.router());
        this.app.use('', this.authRouter.router());
        this.app.use('', this.quizRouter.router());
        this.app.use('', this.questionRouter.router());
    }

    public run(): http.Server {
        return this.app.listen(this.config.APP.PORT, () => {
            this.logger.info({
                msg: `Server start on ${this.config.APP.PORT}!`,
            });
        });
    }

    private async authCookieMiddleware(
        req: Request,
        resp: Response,
        next: NextFunction,
    ) {
        if (req.cookies[NameCookieAccess]) {
            const access_token = req.cookies[NameCookieAccess];
            const res = await this.authTokenProvider.get(access_token);

            if (res) {
                const authUnit: AuthStorageUnit = JSON.parse(res);
                console.log(authUnit);
                AuthContext.bind(req, authUnit);
            }
        }
        next();
    }
}
