import { QuizService } from '../domain/services/quiz/quiz.service';
import { sendJson } from './utils';
import { AuthContext } from './auth.context';
import { HttpStatus } from '../../pkg/http-status';
import {
    createQuizDTO,
    deleteQuizDTO,
    getQuizDTO,
    getQuizzesDTO,
    getQuizzesFilter,
    getQuizzesOrder,
    QuizCreate,
    updateQuizDTO,
    updateQuizSet,
} from '../domain/services/quiz/dto';
import Duration from '@icholy/duration';
import { StringToBool } from '../../pkg/utils/bool';
import {
    FastifyInstance,
    FastifyPluginOptions,
    FastifyReply,
    FastifyRequest,
} from 'fastify';

export class QuizRouter {
    private quizService: QuizService;

    public constructor(quizService: QuizService) {
        this.quizService = quizService;
    }

    public router(
        instance: FastifyInstance,
        options: FastifyPluginOptions,
        done: () => void,
    ) {
        instance.get('/api/v1/user/:id_user/quiz', this.getQuizzes.bind(this));
        instance.post('/api/v1/user/:id_user/quiz', this.createQuiz.bind(this));
        instance.get(
            '/api/v1/user/:id_user/quiz/:id_quiz',
            this.getQuiz.bind(this),
        );
        instance.put(
            '/api/v1/user/:id_user/quiz/:id_quiz',
            this.updateQuiz.bind(this),
        );
        instance.delete(
            '/api/v1/user/:id_user/quiz/:id_quiz',
            this.deleteQuiz.bind(this),
        );

        done();
    }

    private async getQuiz(
        req: FastifyRequest<{
            Params: {
                id_user: string;
                id_quiz: string;
            };
        }>,
        reply: FastifyReply,
    ) {
        const id_user = req.params.id_user;
        const id_quiz = Number(req.params.id_quiz);

        AuthContext.checkAccessIdOrAdmin(req, id_user);

        const res = await this.quizService.getQuiz(
            new getQuizDTO(id_user, id_quiz),
        );

        sendJson(
            reply,
            {
                quiz: res.quiz,
            },
            HttpStatus.OK,
        );
    }

    private async createQuiz(
        req: FastifyRequest<{
            Params: {
                id_user: string;
            };
            Body: {
                name?: string;
                title?: string;
                description?: string;
                intro_url?: string;
                ttl?: string;
                tts?: Date;
                tte?: Date;
                is_show?: boolean;
                is_strict?: boolean;
                is_random?: boolean;
            };
        }>,
        reply: FastifyReply,
    ) {
        const id = req.params.id_user;

        AuthContext.checkAccessIdOrAdmin(req, id);

        const quiz: QuizCreate = {
            name: req.body.name || '',
            title: req.body.title || '',
            description: req.body.description || '',
            intro_url: req.body.intro_url || '',
            ttl: req.body.ttl || null,
            tts: req.body.tts || null,
            tte: req.body.tte || null,
            is_show: req.body.is_show || true,
            is_strict: req.body.is_strict || false,
            is_random: req.body.is_random || false,
        };

        const res = await this.quizService.createQuiz(
            new createQuizDTO(id, quiz),
        );

        sendJson(
            reply,
            {
                id: res.id,
            },
            HttpStatus.OK,
        );
    }

    public possibleFilter: (keyof getQuizzesFilter)[] = [
        'name',
        'title',
        'description',
        'is_show',
        'is_strict',
        'is_random',
    ];
    public possibleOrder: (keyof getQuizzesOrder)[] = [
        'date_modify',
        'name',
        'title',
        'description',
        'ttl',
    ];

    private async getQuizzes(
        req: FastifyRequest<{
            Params: {
                id_user: string;
            };
            Querystring: {
                page?: string;
                description?: string;
                name?: string;
                title?: string;
                is_show?: string;
                is_strict?: string;
                is_random?: string;
                order?: {
                    date_modify?: string;
                    name?: string;
                    title?: string;
                    description?: string;
                    ttl?: string;
                };
            };
        }>,
        reply: FastifyReply,
    ) {
        const id = req.params.id_user;
        const page = req.query.page ? Number(req.query.page) : 1;

        //  parse filter props
        const filter: getQuizzesFilter = {};
        this.possibleFilter.forEach((key) => {
            const value = req.query[key];
            if (value) {
                switch (key) {
                    case 'description':
                    case 'name':
                    case 'title':
                        filter[key] = value;
                        break;
                    case 'is_show':
                    case 'is_strict':
                    case 'is_random':
                        filter[key] = StringToBool(value);
                }
            }
        });

        // parse order props
        const order: getQuizzesOrder = {};
        const queryOrder = req.query.order;
        if (queryOrder) {
            this.possibleOrder.forEach((key) => {
                const value = queryOrder[key];
                if (value) {
                    order[key] = value === 'DESC' ? 'DESC' : 'ASC';
                }
            });
        } else {
            order['date_modify'] = 'DESC';
        }

        const res = await this.quizService.getQuizzes(
            new getQuizzesDTO(id, page, filter, order),
        );

        sendJson(
            reply,
            {
                quizzes: res.quizzes,
                count: res.count,
            },
            HttpStatus.OK,
        );
    }

    private async deleteQuiz(
        req: FastifyRequest<{
            Params: {
                id_user: string;
                id_quiz: string;
            };
        }>,
        reply: FastifyReply,
    ) {
        const id_owner = req.params.id_user;
        const id_quiz = Number(req.params.id_quiz);

        AuthContext.checkAccessIdOrAdmin(req, id_owner);

        await this.quizService.deleteQuiz(new deleteQuizDTO(id_quiz, id_owner));

        reply.status(HttpStatus.NO_CONTENT).send();
    }

    private async updateQuiz(
        req: FastifyRequest<{
            Params: {
                id_user: string;
                id_quiz: string;
            };
            Body: {
                name?: string;
                title?: string;
                description?: string;
                intro_url?: string;
                ttl?: Duration;
                tts?: Date;
                tte?: Date;
                is_show?: boolean;
                is_strict?: boolean;
                is_random?: boolean;
            };
        }>,
        reply: FastifyReply,
    ) {
        const id_owner = req.params.id_user;
        const id_quiz = Number(req.params.id_quiz);

        AuthContext.checkAccessIdOrAdmin(req, id_owner);

        const set: updateQuizSet = {
            name: req.body.name || '',
            title: req.body.title || '',
            description: req.body.description || '',
            intro_url: req.body.intro_url || '',
            ttl: req.body.ttl || null,
            tts: req.body.tts || null,
            tte: req.body.tte || null,
            is_show: req.body.is_show || true,
            is_strict: req.body.is_strict || false,
            is_random: req.body.is_random || false,
        };

        await this.quizService.updateQuiz(
            new updateQuizDTO(id_quiz, id_owner, set),
        );

        reply.status(HttpStatus.NO_CONTENT).send();
    }
}
