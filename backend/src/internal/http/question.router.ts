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
import {FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest} from "fastify";
import {string} from "yup";
import {QuestionType} from "../db/postgres/questions.models";

export class QuestionRouter {
    private questionService: QuestionService;

    public constructor(questionService: QuestionService) {
        this.questionService = questionService;
    }

    public router(
        instance: FastifyInstance,
        options: FastifyPluginOptions,
        done: () => void,
    ) {
        instance.get(
            '/api/v1/user/:id_user/quiz/:id_quiz/question',
            this.getListOfQuestion.bind(this),
        );
        instance.post(
            '/api/v1/user/:id_user/quiz/:id_quiz/question',
            this.createQuestion.bind(this),
        );
        instance.get(
            '/api/v1/user/:id_user/quiz/:id_quiz/question/:id_question',
            this.getQuestion.bind(this),
        );
        instance.put(
            '/api/v1/user/:id_user/quiz/:id_quiz/question/:id_question',
            this.updateQuestion.bind(this),
        );
        instance.delete(
            '/api/v1/user/:id_user/quiz/:id_quiz/question/:id_question',
            this.deleteQuestion.bind(this),
        );

        done()
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

    private async getListOfQuestion(
        req: FastifyRequest<{
            Params: {
                id_user: string;
                id_quiz: string;
            };
            Querystring: {
                page: string
                title?: string
                type?: string
                data?: string
                is_show?: string
                order?: {
                    date_modify?: string
                    title?: string
                    is_show?: string
                }
            }
        }>,
        reply: FastifyReply,
    ) {
        const id_user = req.params.id_user;
        const id_quiz = Number(req.params.id_quiz);
        const page = req.query.page ? Number(req.query.page) : 1;

        AuthContext.checkAccessIdOrAdmin(req, id_user);

        const filter: getListOfQuestionsFilter = {};

        //  parse filter props
        this.possibleFilter.forEach((key) => {
            const value = req.query[key];
            if (value) {
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
                if (value) {
                    order[key] = value === 'DESC' ? 'DESC' : 'ASC';
                }
            });
        } else {
            order['date_modify'] = 'DESC';
        }

        const res = await this.questionService.getListOfQuestions(
            new getListOfQuestionsDTO(
                page,
                id_user,
                id_quiz,
                filter,
                order,
            ),
        );

        sendJson(
            reply,
            {
                questions: res.questions,
                count: res.count,
            },
            HttpStatus.OK,
        );

    }

    private async createQuestion(
        req: FastifyRequest<{
            Params: {
                id_user: string;
                id_quiz: string;
            };
            Body: {
                title?: string
                type?: any // TODO
                data?: any  // TODO
                is_show?: boolean
            }
        }>,
        reply: FastifyReply,
    ) {
        const id_user = req.params.id_user;
        const id_quiz = Number(req.params.id_quiz);

        AuthContext.checkAccessIdOrAdmin(req, id_user);

        console.log(req.body);
        const question: QuestionCreate = {
            title: req.body.title || "",
            type: req.body.type,
            data: req.body.data,
            is_show: req.body.is_show || false,
        };

        const res = await this.questionService.createQuestion(
            new createQuestionDTO(id_user, id_quiz, question),
        );

        sendJson(
            reply,
            {
                id: res.id_question,
            },
            HttpStatus.OK,
        );
    }

    private async getQuestion(
        req: FastifyRequest<{
            Params: {
                id_user: string;
                id_quiz: string;
                id_question: string
            };
        }>,
        reply: FastifyReply,
    ) {
        const id_user = req.params.id_user;
        const id_quiz = Number(req.params.id_quiz);
        const id_question = Number(req.params.id_question);

        AuthContext.checkAccessIdOrAdmin(req, id_user);

        const res = await this.questionService.getQuestion(
            new getQuestionDTO(id_user, id_quiz, id_question),
        );

        sendJson(
            reply,
            {
                question: res.question,
            },
            HttpStatus.OK,
        );
    }

    private async updateQuestion(
        req: FastifyRequest<{
            Params: {
                id_user: string;
                id_quiz: string;
                id_question: string
            };
            Body: {
                title?: string
                type?: any // TODO
                data?: any  // TODO
                is_show?: boolean
            }
        }>,
        reply: FastifyReply,
    ) {
        const id_user = req.params.id_user;
        const id_quiz = Number(req.params.id_quiz);
        const id_question = Number(req.params.id_question);
        const question: QuestionUpdate = {
            title: req.body.title || "",
            type: req.body.type,
            data: req.body.data,
            is_show: req.body.is_show || false,
        };

        AuthContext.checkAccessIdOrAdmin(req, id_user);

        await this.questionService.updateQuestion(
            new updateQuestionDTO(id_user, id_quiz, id_question, question),
        );

        reply.status(HttpStatus.NO_CONTENT).send()
    }

    private async deleteQuestion(
        req: FastifyRequest<{
            Params: {
                id_user: string;
                id_quiz: string;
                id_question: string
            };
        }>,
        reply: FastifyReply,
    ) {
        const id_user = req.params.id_user;
        const id_quiz = Number(req.params.id_quiz);
        const id_question = Number(req.params.id_question);

        AuthContext.checkAccessIdOrAdmin(req, id_user);

        await this.questionService.deleteQuestion(
            new deleteQuestionDTO(id_user, id_quiz, id_question),
        );

        reply.status(HttpStatus.NO_CONTENT);
    }
}
