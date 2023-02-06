import { Request, Response, Router } from "express";
import { QuizService } from "../domain/services/quiz/quiz.service";
import { parseAndSendError, sendJson } from "./utils";
import { AuthContext } from "./auth.context";
import { HttpStatus } from "../../pkg/http-status";
import {
    createQuizDTO,
    deleteQuizDTO,
    getQuizzesDTO,
    getQuizzesFilter,
    getQuizzesOrder,
    updateQuizDTO,
    updateQuizSet,
} from "../domain/services/quiz/dto";
import Duration from "@icholy/duration";

export class QuizRouter {
    private quizService: QuizService;

    constructor(quizService: QuizService) {
        this.quizService = quizService;
    }

    public router(): Router {
        const r = Router();

        r.get("/api/v1/user/:id/quizzes", this.getQuizzes.bind(this));
        r.post("/api/v1/user/:id/quiz", this.createQuiz.bind(this));
        // r.get("/api/v1/user/:id_or_name_owner/quiz/:id_or_name_quiz") TODO
        r.put(
            "/api/v1/user/:id_owner/quiz/:id_quiz",
            this.updateQuiz.bind(this)
        );
        r.delete(
            "/api/v1/user/:id_owner/quiz/:id_quiz",
            this.deleteQuiz.bind(this)
        );

        return r;
    }

    private async createQuiz(req: Request, resp: Response) {
        try {
            const id = req.params.id;

            AuthContext.checkAccessIdOrAdmin(req, id);

            const dto = new createQuizDTO(
                id,
                req.body.name,
                req.body.title,
                req.body.description,
                req.body.intro_url,
                new Date(),
                req.body.ttl ? new Duration(req.body.ttl) : null,
                req.body.tts ? new Date(req.body.tts) : null,
                req.body.tte ? new Date(req.body.tte) : null
            );

            const res = await this.quizService.createQuiz(dto);

            sendJson(
                resp,
                {
                    id: res.id,
                },
                HttpStatus.OK
            );
        } catch (e) {
            parseAndSendError(e, resp);
        }
        resp.end();
    }

    possibleFilter: (keyof getQuizzesFilter)[] = [
        "name",
        "title",
        "description",
    ];
    possibleOrder: (keyof getQuizzesOrder)[] = [
        "date_create",
        "name",
        "title",
        "description",
        "ttl",
    ];

    private async getQuizzes(req: Request, resp: Response) {
        try {
            const id = req.params.id;
            const page = req.query.page ? Number(req.query.page) : 1;

            const filter: getQuizzesFilter = {};

            //  parse filter props
            this.possibleFilter.forEach((key) => {
                const value = req.query[key];
                if (value && typeof value === "string") {
                    filter[key] = value;
                }
            });

            // parse order props
            const order: getQuizzesOrder = {};
            const orderObj = req.query.order;
            if (
                orderObj &&
                typeof orderObj === "object" &&
                !Array.isArray(orderObj)
            ) {
                this.possibleOrder.forEach((key) => {
                    const value = orderObj[key];
                    if (value && typeof value === "string") {
                        order[key] = value === "DESC" ? "DESC" : "ASC";
                    }
                });
            } else {
                order["date_create"] = "DESC"; // TODO: date_modify
            }

            const dto = new getQuizzesDTO(id, page, filter, order);

            const res = await this.quizService.getQuizzes(dto);

            sendJson(
                resp,
                {
                    quizzes: res.quizzes,
                    count: res.count,
                },
                HttpStatus.OK
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
                new deleteQuizDTO(id_quiz, id_owner)
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
                name: req.body.name || "",
                title: req.body.title || "",
                description: req.body.description || "",
                intro_url: req.body.intro_url || "",
                ttl: req.body.ttl ? new Duration(req.body.ttl) : null,
                tts: req.body.tts ? new Date(req.body.tts) : null,
                tte: req.body.tte ? new Date(req.body.tte) : null,
            };

            await this.quizService.updateQuiz(
                new updateQuizDTO(id_quiz, id_owner, set)
            );

            resp.status(HttpStatus.NO_CONTENT);
        } catch (e) {
            parseAndSendError(e, resp);
        }
        resp.end();
    }
}
