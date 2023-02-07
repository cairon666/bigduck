import {Logger} from '../../../../pkg/logger';
import {Question} from '../../../db/postgres/questions.models';
import {
    createQuestionDTO,
    createQuestionResponse,
    deleteQuestionDTO,
    getListOfQuestionsDTO,
    getListOfQuestionsFilter,
    getListOfQuestionsOrder,
    getListOfQuestionsResponse,
    getQuestionDTO,
    getQuestionResponse, QuestionToQuestionRequest,
    updateQuestionDTO,
} from './dto';
import {Beda} from '../../../../pkg/beda/Beda';
import {CodeError, Exceptions} from '../../exceptions/exceptions';
import {Brackets, Repository} from "typeorm";

export class QuestionService {
    private logger: Logger;
    private questionRepo: Repository<Question>;

    public static page_size = 10;

    public constructor(logger: Logger, questionRepo: Repository<Question>) {
        this.logger = logger;
        this.questionRepo = questionRepo;
    }

    public async createQuestion(
        dto: createQuestionDTO,
    ): Promise<createQuestionResponse> {
        dto.isValid();

        try {
            const res = await this.questionRepo
                .createQueryBuilder('question')
                .insert()
                .values({
                    id_user_owner: dto.id_user,
                    id_quiz_owner: dto.id_quiz,
                    title: dto.question.title,
                    type: dto.question.type,
                    data: dto.question.data,
                    date_modify: new Date(),
                    is_show: dto.question.is_show,
                })
                .returning('id')
                .execute();

            return new createQuestionResponse(res.raw[0].id);
        } catch (e) {
            throw new Beda(Exceptions.Database, CodeError.Database);
        }
    }

    public async getQuestion(
        dto: getQuestionDTO,
    ): Promise<getQuestionResponse> {
        dto.isValid();

        let res: Question | null;
        try {
            res = await this.questionRepo.findOne({
                where: {
                    id: dto.id_question,
                    id_quiz_owner: dto.id_quiz,
                    id_user_owner: dto.id_user,
                },
            });
        } catch (e) {
            throw new Beda(Exceptions.Database, CodeError.Database);
        }

        if (!res) {
            throw new Beda(Exceptions.NotFound, CodeError.NotFound);
        }

        return new getQuestionResponse(QuestionToQuestionRequest(res));
    }

    public async deleteQuestion(dto: deleteQuestionDTO): Promise<void> {
        dto.isValid();

        try {
            await this.questionRepo.delete({
                id: dto.id_question,
                id_quiz_owner: dto.id_quiz,
                id_user_owner: dto.id_user,
            });
        } catch (e) {
            throw new Beda(Exceptions.Database, CodeError.Database);
        }
    }

    public async updateQuestion(dto: updateQuestionDTO): Promise<void> {
        dto.isValid();

        try {
            const res = await this.questionRepo
                .createQueryBuilder("q")
                .update()
                .set({
                    title: dto.question.title,
                    type: dto.question.type,
                    data: dto.question.data,
                    date_modify: new Date(),
                    is_show: dto.question.is_show,
                })
                .where({
                    id: dto.id_question,
                    id_quiz_owner: dto.id_quiz,
                    id_user_owner: dto.id_user,
                })
                .execute();
            console.log(res)
        } catch (e) {
            throw new Beda(Exceptions.Database, CodeError.Database);
        }
    }

    public async getListOfQuestions(dto: getListOfQuestionsDTO): Promise<getListOfQuestionsResponse> {
        dto.isValid();

        let query = this.questionRepo
            .createQueryBuilder('q')
            .select()
            .where('id_user_owner = :id_user_owner', {id_user_owner: dto.id_user})
            .andWhere('id_quiz_owner = :id_quiz_owner', {id_quiz_owner: dto.id_quiz})
            .andWhere(
                new Brackets((qb) => {
                    (
                        Object.keys(dto.filter) as (keyof getListOfQuestionsFilter)[]
                    ).forEach((key) => {
                        const value = dto.filter[key];
                        qb.orWhere(`${key} ~ :${key}`, {[key]: value});
                    });
                }),
            )
            .limit(QuestionService.page_size)
            .offset(QuestionService.page_size * (dto.page - 1));

        (Object.keys(dto.order) as (keyof getListOfQuestionsOrder)[]).forEach((key) => {
            const value = dto.order[key];
            query = query.addOrderBy(key, value);
        });

        try {
            const [questions, count] = await query.getManyAndCount()
            return new getListOfQuestionsResponse(questions.map(QuestionToQuestionRequest), count)
        } catch (e) {
            throw new Beda(Exceptions.Database, CodeError.Database);
        }
    }
}
