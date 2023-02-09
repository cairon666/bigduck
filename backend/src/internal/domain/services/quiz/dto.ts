import Duration from '@icholy/duration';
import { getOrder, isValid } from '../utils';
import {
    createQuizScheme,
    deleteQuizScheme,
    getQuizScheme,
    getQuizzesScheme,
    updateQuizScheme,
} from './scheme';
import { Quizzes } from '../../../db/postgres/quizzes.models';

export interface Quiz {
    id: number;
    id_owner: string;
    name: string;
    title: string;
    description: string;
    intro_url: string;
    date_create: Date;
    date_modify: Date;
    ttl: string | null;
    tts: Date | null;
    tte: Date | null;
    is_show: boolean;
    is_strict: boolean;
    is_random: boolean;
}

export function QuizDBtoQuiz(quiz: Quizzes): Quiz {
    return {
        id: quiz.id,
        id_owner: quiz.id_owner,
        name: quiz.name,
        title: quiz.title,
        description: quiz.description,
        intro_url: quiz.intro_url,
        date_create: quiz.date_create,
        date_modify: quiz.date_modify,
        ttl: quiz.ttl,
        tts: quiz.tts,
        tte: quiz.tte,
        is_show: quiz.is_show,
        is_strict: quiz.is_strict,
        is_random: quiz.is_random,
    };
}

export type QuizCreate = Omit<
    Quiz,
    'date_create' | 'date_modify' | 'id' | 'id_owner'
>;

export class createQuizDTO {
    public id_owner: string;
    public quiz: QuizCreate;

    public constructor(id_owner: string, quiz: QuizCreate) {
        this.id_owner = id_owner;
        this.quiz = quiz;
    }

    public isValid() {
        isValid(createQuizScheme, this);
    }
}

export class createQuizResponseDTO {
    public id: number;

    public constructor(id: number) {
        this.id = id;
    }
}

export interface getQuizzesFilter {
    name?: string;
    title?: string;
    description?: string;
    is_show?: boolean;
    is_strict?: boolean;
    is_random?: boolean;
}

export type getQuizzesOrder = getOrder<
    'date_modify' | 'name' | 'title' | 'description' | 'ttl'
>;

export class getQuizzesDTO {
    public id_owner: string;
    public page: number;
    public filter: getQuizzesFilter;
    public order: getQuizzesOrder;

    public constructor(
        id_owner: string,
        page: number,
        filter: getQuizzesFilter,
        order: getQuizzesOrder,
    ) {
        this.id_owner = id_owner;
        this.page = page;
        this.filter = filter;
        this.order = order;
    }

    public isValid() {
        isValid(getQuizzesScheme, this);
    }
}

export class getQuizzesResponseDTO {
    public quizzes: Quiz[];
    public count: number;

    public constructor(quizzes: Quiz[], count: number) {
        this.quizzes = quizzes;
        this.count = count;
    }
}

export class deleteQuizDTO {
    public id: number;
    public id_owner: string;

    public constructor(id: number, id_owner: string) {
        this.id = id;
        this.id_owner = id_owner;
    }

    public isValid() {
        isValid(deleteQuizScheme, this);
    }
}

export interface updateQuizSet {
    name: string;
    title: string;
    description: string;
    intro_url: string;
    ttl: Duration | null;
    tts: Date | null;
    tte: Date | null;
    is_show: boolean;
    is_strict: boolean;
    is_random: boolean;
}

export class updateQuizDTO {
    public id_quiz: number;
    public id_owner: string;
    public set: updateQuizSet;

    public constructor(id_quiz: number, id_owner: string, set: updateQuizSet) {
        this.id_quiz = id_quiz;
        this.id_owner = id_owner;
        this.set = set;
    }

    public isValid() {
        isValid(updateQuizScheme, this);
    }
}

export class getQuizDTO {
    public id_user: string;
    public id_quiz: number;

    public constructor(id_user: string, id_quiz: number) {
        this.id_user = id_user;
        this.id_quiz = id_quiz;
    }

    public isValid() {
        isValid(getQuizScheme, this);
    }
}

export class getQuizResponse {
    public quiz: Quiz;

    public constructor(quiz: Quiz) {
        this.quiz = quiz;
    }
}
