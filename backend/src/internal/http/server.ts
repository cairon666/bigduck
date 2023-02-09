import { AuthService } from '../domain/services/auth/auth.service';
import { Config } from '../config';
import { AuthTokenProvider } from '../adapters/authTokenProvider/authTokenProvider';
import { AuthRouter } from './auth.router';
import { Logger } from '../../pkg/logger';
import { UserService } from '../domain/services/user/user.service';
import { UserRouter } from './user.router';
import { AuthStorageUnit, NameCookieAccess, sendError } from './utils';
import { AuthContext } from './auth.context';
import { QuizService } from '../domain/services/quiz/quiz.service';
import { QuizRouter } from './quiz.router';
import { QuestionRouter } from './question.router';
import { QuestionService } from '../domain/services/question/question.service';
import { AttachmentRouter } from './attachment.router';
import Fastify, {
    FastifyInstance,
    FastifyReply,
    FastifyRequest,
} from 'fastify';
import fastifyCookie from '@fastify/cookie';
import { Beda } from '../../pkg/beda/Beda';
import { HttpStatus } from '../../pkg/http-status';
import qs from 'qs';

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
    private attachmentRouter: AttachmentRouter;

    // public app for tests
    public app: FastifyInstance;

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
        this.attachmentRouter = new AttachmentRouter();

        this.app = Fastify({
            logger: true,
            querystringParser: (str) => qs.parse(str),
        });
    }

    public setup() {
        this.app.register(fastifyCookie, {
            secret: 'backend',
            hook: 'onRequest',
        });
        this.app.addHook('onRequest', this.authCookieMiddleware.bind(this));
        this.app.setErrorHandler(this.errorHandler);
        this.app.register(this.authRouter.router.bind(this.authRouter));
        this.app.register(this.userRouter.router.bind(this.userRouter));
        this.app.register(this.quizRouter.router.bind(this.quizRouter));
        this.app.register(this.questionRouter.router.bind(this.questionRouter));
        this.app.register(
            this.attachmentRouter.router.bind(this.attachmentRouter),
        );
    }

    public run(): void {
        this.app.ready(() => {
            this.app.listen(
                {
                    host: this.config.APP.HOST,
                    port: Number(this.config.APP.PORT),
                },
                (err, address) => {
                    if (err) {
                        throw err;
                    }

                    this.logger.info({
                        msg: `Server start on ${address}!`,
                    });
                },
            );
        });
    }

    private async authCookieMiddleware(
        req: FastifyRequest,
        reply: FastifyReply,
    ) {
        if (req.cookies[NameCookieAccess]) {
            const access_token = req.cookies[NameCookieAccess];
            const res = await this.authTokenProvider.get(access_token);

            if (!res) {
                return;
            }

            const authUnit: AuthStorageUnit = JSON.parse(res);
            console.log(authUnit);
            AuthContext.bind(req, authUnit);
            console.log(res);
        }
    }

    private async errorHandler(
        e: unknown,
        req: FastifyRequest,
        reply: FastifyReply,
    ) {
        console.log(e);
        if (e instanceof Beda) {
            sendError(
                reply,
                {
                    error: e.getTitle(),
                    details: e.getDesc(),
                    code: e.getCode(),
                },
                HttpStatus.BAD_REQUEST,
            );
        } else {
            reply.send(e);
        }
    }
}
