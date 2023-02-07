import {Request, Response, Router} from 'express';
import {QuestionService} from '../domain/services/question/question.service';
import {AuthContext} from './auth.context';
import {parseAndSendError, sendJson} from './utils';
import {
    createQuestionDTO,
    QuestionCreate,
    deleteQuestionDTO,
    getQuestionDTO,
    QuestionUpdate,
    updateQuestionDTO,
    getListOfQuestionsFilter,
    getListOfQuestionsOrder,
    getListOfQuestionsDTO,
} from '../domain/services/question/dto';
import {HttpStatus} from '../../pkg/http-status';

export class QuestionRouter {
    private questionService: QuestionService;

    public constructor(questionService: QuestionService) {
        this.questionService = questionService;
    }

    public router(): Router {
        const r = Router();

        r.get(
            '/api/v1/user/:id_user/quiz/:id_quiz/question',
            this.getListOfQuestion.bind(this),
        );
        r.post(
            '/api/v1/user/:id_user/quiz/:id_quiz/question',
            this.createQuestion.bind(this),
        );
        r.get(
            '/api/v1/user/:id_user/quiz/:id_quiz/question/:id_question',
            this.getQuestion.bind(this),
        );
        r.put(
            '/api/v1/user/:id_user/quiz/:id_quiz/question/:id_question',
            this.updateQuestion.bind(this),
        );
        r.delete(
            '/api/v1/user/:id_user/quiz/:id_quiz/question/:id_question',
            this.deleteQuestion.bind(this),
        );

        return r;
    }

    public possibleFilter: (keyof getListOfQuestionsFilter)[] = [
        'title',
        'type',
        'data',
        'is_show',
    ];
    public possibleOrder: (keyof getListOfQuestionsOrder)[] = [
        'date_modify',
        'title',
        'is_show',
    ];

    private async getListOfQuestion(req: Request, resp: Response) {
        try {
            const id_user = req.params.id_user;
            const id_quiz = Number(req.params.id_quiz);
            const page = req.query.page ? Number(req.query.page) : 1;

            AuthContext.checkAccessIdOrAdmin(req, id_user);

            const filter: getListOfQuestionsFilter = {};

            //  parse filter props
            this.possibleFilter.forEach((key) => {
                const value = req.query[key];
                if (value && typeof value === 'string') {
                    // @ts-ignore
                    filter[key] = value;
                }
            });

            // parse order props
            const order: getListOfQuestionsOrder = {};
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

            const res = await this.questionService.getListOfQuestions(
                new getListOfQuestionsDTO(page, id_user, id_quiz, filter, order)
            );

            sendJson(
                resp,
                {
                    questions: res.questions,
                    count: res.count,
                },
                HttpStatus.OK,
            );
        } catch (e) {
            parseAndSendError(e, resp);
        }
        resp.end();
    }

    private async createQuestion(req: Request, resp: Response) {
        try {
            const id_user = req.params.id_user;
            const id_quiz = Number(req.params.id_quiz);

            AuthContext.checkAccessIdOrAdmin(req, id_user);

            console.log(req.body);
            const question: QuestionCreate = {
                title: req.body.title,
                type: req.body.type,
                data: req.body.data,
                is_show: req.body.is_show,
            };

            const res = await this.questionService.createQuestion(
                new createQuestionDTO(id_user, id_quiz, question),
            );

            sendJson(
                resp,
                {
                    id: res.id_question,
                },
                HttpStatus.OK,
            );
        } catch (e) {
            parseAndSendError(e, resp);
        }
        resp.end();
    }

    private async getQuestion(req: Request, resp: Response) {
        try {
            const id_user = req.params.id_user;
            const id_quiz = Number(req.params.id_quiz);
            const id_question = Number(req.params.id_question);

            AuthContext.checkAccessIdOrAdmin(req, id_user);

            const res = await this.questionService.getQuestion(
                new getQuestionDTO(id_user, id_quiz, id_question),
            );

            sendJson(
                resp,
                {
                    question: res.question,
                },
                HttpStatus.OK,
            );
        } catch (e) {
            parseAndSendError(e, resp);
        }
        resp.end();
    }

    private async updateQuestion(req: Request, resp: Response) {
        try {
            const id_user = req.params.id_user;
            const id_quiz = Number(req.params.id_quiz);
            const id_question = Number(req.params.id_question);
            const question: QuestionUpdate = {
                title: req.body.title,
                type: req.body.type,
                data: req.body.data,
                is_show: req.body.is_show,
            };

            AuthContext.checkAccessIdOrAdmin(req, id_user);

            await this.questionService.updateQuestion(new updateQuestionDTO(
                id_user,
                id_quiz,
                id_question,
                question
            ))
        } catch (e) {
            parseAndSendError(e, resp);
        }
        resp.end();
    }

    private async deleteQuestion(req: Request, resp: Response) {
        try {
            const id_user = req.params.id_user;
            const id_quiz = Number(req.params.id_quiz);
            const id_question = Number(req.params.id_question);

            AuthContext.checkAccessIdOrAdmin(req, id_user);

            await this.questionService.deleteQuestion(
                new deleteQuestionDTO(id_user, id_quiz, id_question),
            );

            resp.status(HttpStatus.NO_CONTENT);
        } catch (e) {
            parseAndSendError(e, resp);
        }
        resp.end();
    }
}
