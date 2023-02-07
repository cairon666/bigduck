import {Request, Response, Router} from 'express';
import {QuizService} from '../domain/services/quiz/quiz.service';
import {parseAndSendError, sendJson} from './utils';
import {AuthContext} from './auth.context';
import {HttpStatus} from '../../pkg/http-status';
import {
    createQuizDTO,
    deleteQuizDTO, getQuizDTO,
    getQuizzesDTO,
    getQuizzesFilter,
    getQuizzesOrder, QuizCreate,
    updateQuizDTO,
    updateQuizSet,
} from '../domain/services/quiz/dto';
import Duration from '@icholy/duration';
import {StringToBool} from "../../pkg/utils/bool";

export class QuizRouter {
    private quizService: QuizService;

    public constructor(quizService: QuizService) {
        this.quizService = quizService;
    }

    public router(): Router {
        const r = Router();

        r.get('/api/v1/user/:id/quiz', this.getQuizzes.bind(this));
        r.post('/api/v1/user/:id/quiz', this.createQuiz.bind(this));
        r.get("/api/v1/user/:id_user/quiz/:id_quiz", this.getQuiz.bind(this))
        r.put(
            '/api/v1/user/:id_owner/quiz/:id_quiz',
            this.updateQuiz.bind(this),
        );
        r.delete(
            '/api/v1/user/:id_owner/quiz/:id_quiz',
            this.deleteQuiz.bind(this),
        );

        return r;
    }

    private async getQuiz(req: Request, resp: Response) {
        try {
            const id_user = req.params.id_user;
            const id_quiz = Number(req.params.id_quiz);

            AuthContext.checkAccessIdOrAdmin(req, id_user);

            const res = await this.quizService.getQuiz(new getQuizDTO(id_user, id_quiz))

            sendJson(
                resp,
                {
                    quiz: res.quiz
                },
                HttpStatus.OK,
            );
        } catch (e) {
            parseAndSendError(e, resp);
        }
        resp.end();
    }

    private async createQuiz(req: Request, resp: Response) {
        try {
            const id = req.params.id;

            AuthContext.checkAccessIdOrAdmin(req, id);

            const quiz: QuizCreate = {
                name: req.body.name,
                title: req.body.title,
                description: req.body.description,
                intro_url: req.body.intro_url,
                ttl: req.body.ttl,
                tts: req.body.tts,
                tte: req.body.tte,
                is_show: req.body.is_show,
                is_strict: req.body.is_strict,
                is_random: req.body.is_random,
            }

            const res = await this.quizService.createQuiz(new createQuizDTO(id, quiz));

            sendJson(
                resp,
                {
                    id: res.id,
                },
                HttpStatus.OK,
            );
        } catch (e) {
            parseAndSendError(e, resp);
        }
        resp.end();
    }

    public possibleFilter: (keyof getQuizzesFilter)[] = [
        'name',
        'title',
        'description',
        'is_show',
        'is_strict',
        'is_random'
    ];
    public possibleOrder: (keyof getQuizzesOrder)[] = [
        'date_modify',
        'name',
        'title',
        'description',
        'ttl',
    ];

    private async getQuizzes(req: Request, resp: Response) {
        try {
            const id = req.params.id;
            const page = req.query.page ? Number(req.query.page) : 1;

            const filter: getQuizzesFilter = {};

            //  parse filter props
            this.possibleFilter.forEach((key) => {
                const value = req.query[key];
                if (value && typeof value === 'string') {
                    switch (key) {
                        case "description":
                        case "name":
                        case "title":
                            filter[key] = value
                            break
                        case "is_show":
                        case "is_strict":
                        case "is_random":
                            filter[key] = StringToBool(value)
                    }


                }
            });

            // parse order props
            const order: getQuizzesOrder = {};
            const orderObj = req.query.order;
            if (
                orderObj &&
                typeof orderObj === 'object' &&
                !Array.isArray(orderObj)
            ) {
                this.possibleOrder.forEach((key) => {
                    const value = orderObj[key];
                    if (value && typeof value === 'string') {
                        order[key] = value === 'DESC' ? 'DESC' : 'ASC';
                    }
                });
            } else {
                order['date_modify'] = 'DESC';
            }

            const dto = new getQuizzesDTO(id, page, filter, order);

            const res = await this.quizService.getQuizzes(dto);

            sendJson(
                resp,
                {
                    quizzes: res.quizzes,
                    count: res.count,
                },
                HttpStatus.OK,
            );
        } catch (e) {
            parseAndSendError(e, resp);
        }
        resp.end();
    }

    private async deleteQuiz(req: Request, resp: Response) {
        try {
            const id_owner = req.params.id_owner;
            const id_quiz = Number(req.params.id_quiz);

            AuthContext.checkAccessIdOrAdmin(req, id_owner);

            await this.quizService.deleteQuiz(
                new deleteQuizDTO(id_quiz, id_owner),
            );

            resp.status(HttpStatus.NO_CONTENT);
        } catch (e) {
            parseAndSendError(e, resp);
        }
        resp.end();
    }

    private async updateQuiz(req: Request, resp: Response) {
        try {
            const id_owner = req.params.id_owner;
            const id_quiz = Number(req.params.id_quiz);

            AuthContext.checkAccessIdOrAdmin(req, id_owner);

            const set: updateQuizSet = {
                name: req.body.name || '',
                title: req.body.title || '',
                description: req.body.description || '',
                intro_url: req.body.intro_url || '',
                ttl: req.body.ttl ? new Duration(req.body.ttl) : null,
                tts: req.body.tts ? new Date(req.body.tts) : null,
                tte: req.body.tte ? new Date(req.body.tte) : null,
                is_show: req.body.is_show,
                is_strict: req.body.is_strict,
                is_random: req.body.is_random,
            };

            await this.quizService.updateQuiz(
                new updateQuizDTO(id_quiz, id_owner, set),
            );

            resp.status(HttpStatus.NO_CONTENT);
        } catch (e) {
            parseAndSendError(e, resp);
        }
        resp.end();
    }
}
