import {Logger} from '../../../../pkg/logger';
import {Brackets, QueryFailedError, Repository} from 'typeorm';
import {Quizzes} from '../../../db/postgres/quizzes.models';
import {
    createQuizDTO,
    createQuizResponseDTO,
    deleteQuizDTO, getQuizDTO, getQuizResponse,
    getQuizzesDTO,
    getQuizzesFilter,
    getQuizzesOrder,
    getQuizzesResponseDTO, QuizDBtoQuiz,
    updateQuizDTO,
} from './dto';
import {Beda} from '../../../../pkg/beda/Beda';
import {CodeError, Exceptions} from '../../exceptions/exceptions';
import {PG_UNIQUE_VIOLATION} from '@drdgvhbh/postgres-error-codes';

export class QuizService {
    private logger: Logger;
    private quizRepo: Repository<Quizzes>;

    public static page_size = 10;

    public constructor(logger: Logger, quizRepo: Repository<Quizzes>) {
        this.logger = logger;
        this.quizRepo = quizRepo;
    }

    public async createQuiz(
        dto: createQuizDTO,
    ): Promise<createQuizResponseDTO> {
        dto.isValid();

        try {
            const res = await this.quizRepo
                .createQueryBuilder('quiz')
                .insert()
                .values({
                    id_owner: dto.id_owner,
                    name: dto.name,
                    title: dto.title,
                    description: dto.description,
                    intro_url: dto.intro_url,
                    date_create: dto.date_create,
                    ttl: dto.ttl ? dto.ttl.toString : null,
                    tts: dto.tts,
                    tte: dto.tte,
                })
                .returning('id')
                .execute();
            return new createQuizResponseDTO(res.raw[0].id);
        } catch (e) {
            console.log(e);
            if (e instanceof QueryFailedError) {
                const err: any = e;
                switch (err.code) {
                    case PG_UNIQUE_VIOLATION:
                        switch (err.constraint) {
                            case 'quizzes_name_uniq':
                                throw new Beda(
                                    Exceptions.NameAlreadyExist,
                                    CodeError.AlreadyExist,
                                );
                            default:
                                throw new Beda(
                                    Exceptions.SomeAlreadyExist,
                                    CodeError.AlreadyExist,
                                );
                        }
                    default:
                        throw new Beda(Exceptions.Database, CodeError.Database);
                }
            }
            throw new Beda(Exceptions.Database, CodeError.Database);
        }
    }

    public async getQuizzes(
        dto: getQuizzesDTO,
    ): Promise<getQuizzesResponseDTO> {
        dto.isValid();

        let query = this.quizRepo
            .createQueryBuilder('quiz')
            .select()
            .where('id_owner = :id_owner', {id_owner: dto.id_owner})
            .andWhere(
                new Brackets((qb) => {
                    (
                        Object.keys(dto.filter) as (keyof getQuizzesFilter)[]
                    ).forEach((key) => {
                        const value = dto.filter[key];
                        qb.orWhere(`${key} ~ :${key}`, {[key]: value});
                    });
                }),
            )
            .limit(QuizService.page_size)
            .offset(QuizService.page_size * (dto.page - 1));

        (Object.keys(dto.order) as (keyof getQuizzesOrder)[]).forEach((key) => {
            const value = dto.order[key];
            query = query.addOrderBy(key, value);
        });

        try {
            const [quizzes, count] = await query.getManyAndCount();
            return new getQuizzesResponseDTO(quizzes.map(QuizDBtoQuiz), count);
        } catch (e) {
            throw new Beda(Exceptions.Database, CodeError.Database);
        }
    }

    public async deleteQuiz(dto: deleteQuizDTO): Promise<void> {
        dto.isValid();

        try {
            await this.quizRepo.delete({
                id: dto.id,
                id_owner: dto.id_owner,
            });
        } catch (e) {
            throw new Beda(Exceptions.Database, CodeError.Database);
        }
    }

    public async updateQuiz(dto: updateQuizDTO): Promise<void> {
        dto.isValid();

        try {
            await this.quizRepo
                .createQueryBuilder('quiz')
                .update()
                .set({
                    name: dto.set.name,
                    title: dto.set.title,
                    description: dto.set.description,
                    intro_url: dto.set.intro_url,
                    ttl: dto.set.ttl ? dto.set.ttl.toString() : null,
                    tts: dto.set.tts,
                    tte: dto.set.tte,
                })
                .where('id = :id', {id: dto.id_quiz})
                .andWhere('id_owner = :id_owner', {id_owner: dto.id_owner})
                .execute();
        } catch (e) {
            throw new Beda(Exceptions.Database, CodeError.Database);
        }
    }

    public async getQuiz(dto: getQuizDTO): Promise<getQuizResponse> {
        dto.isValid()

        let res: Quizzes | null
        try {
            res = await this.quizRepo
                .createQueryBuilder('quiz')
                .select()
                .where({
                    id: dto.id_quiz,
                    id_owner: dto.id_user,
                })
                .getOne()
        } catch (e) {
            throw new Beda(Exceptions.Database, CodeError.Database);
        }

        if (!res) {
            throw new Beda(Exceptions.NotFound, CodeError.NotFound);
        }

        return new getQuizResponse(QuizDBtoQuiz(res))
    }
}
