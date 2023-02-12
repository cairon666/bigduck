import { AuthService } from '../domain/services/auth/auth.service';
import { Config } from '../config';
import { AuthRouter } from './auth.router';
import { Logger } from '../../pkg/logger';
import { UserService } from '../domain/services/user/user.service';
import { UserRouter } from './user.router';
import { sendError } from './utils';
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
import { Beda } from '../../pkg/beda/Beda';
import { HttpStatus } from '../../pkg/http-status';
import qs from 'qs';
import fastifyCookie from "@fastify/cookie";

export class HTTPServer {
    private config: Config;
    private logger: Logger;

    // service
    private authService: AuthService;
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
        authService: AuthService,
        userService: UserService,
        quizService: QuizService,
        questionService: QuestionService,
    ) {
        this.config = conf;
        this.logger = logger;

        // service
        this.authService = authService;
        this.userService = userService;
        this.quizService = quizService;
        this.questionService = questionService;

        // routes
        this.userRouter = new UserRouter(this.userService);
        this.authRouter = new AuthRouter(
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

        // hooks
        this.app.register(fastifyCookie, {
            secret: "secret-cookie",
        })
        this.app.addHook('preHandler', this.corsHandler.bind(this));
        this.app.options('*', (request, reply) => { reply.send() })

        // routes
        this.app.register(this.authRouter.router.bind(this.authRouter));
        this.app.register(this.userRouter.router.bind(this.userRouter));
        this.app.register(this.quizRouter.router.bind(this.quizRouter));
        this.app.register(this.questionRouter.router.bind(this.questionRouter));
        this.app.register(
            this.attachmentRouter.router.bind(this.attachmentRouter),
        );

        // utils
        this.app.setNotFoundHandler(this.notFoundPathHandler.bind(this));
        this.app.setErrorHandler(this.errorHandler.bind(this));
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

    private async errorHandler(
        e: unknown,
        _: FastifyRequest,
        reply: FastifyReply,
    ) {
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

    private corsHandler(
        _: FastifyRequest,
        reply: FastifyReply,
        done: () => void
    ) {
        reply.header('Access-Control-Allow-Origin', 'http://localhost:8080');
        reply.header('Access-Control-Allow-Methods', '*');
        reply.header('Access-Control-Allow-Headers', '*');
        reply.header('Access-Control-Allow-Credentials', 'true');
        reply.header("Access-Control-Expose-Headers", "Set-Cookie")
        done()
    }

    private async notFoundPathHandler(
        _: FastifyRequest,
        reply: FastifyReply,
    ) {
        reply.status(HttpStatus.NOT_FOUND).send()
    }
}
