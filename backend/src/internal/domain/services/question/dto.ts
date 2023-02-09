import {
    createQuestionScheme,
    deleteQuestionScheme,
    getListOfQuestionsScheme,
    getQuestionScheme,
    updateQuestionScheme,
} from './scheme';
import {
    Question,
    QuestionData,
    QuestionType,
} from '../../../db/postgres/questions.models';
import { getOrder, isValid } from '../utils';

export interface QuestionRequest {
    id: number;
    id_user_owner: string;
    id_quiz_owner: number;
    title: string;
    type: QuestionType;
    data: QuestionData;
    date_modify: Date;
    is_show: boolean;
}

export function QuestionToQuestionRequest(q: Question): QuestionRequest {
    return {
        id: q.id,
        id_user_owner: q.id_user_owner,
        id_quiz_owner: q.id_quiz_owner,
        title: q.title,
        type: q.type,
        data: q.data,
        date_modify: q.date_modify,
        is_show: q.is_show,
    };
}

export type QuestionCreate = Omit<
    QuestionRequest,
    'id' | 'id_user_owner' | 'id_quiz_owner' | 'date_modify'
>;

export class createQuestionDTO {
    public id_user: string;
    public id_quiz: number;
    public question: QuestionCreate;

    public constructor(
        id_user: string,
        id_quiz: number,
        question: QuestionCreate,
    ) {
        this.id_user = id_user;
        this.id_quiz = id_quiz;
        this.question = question;
    }

    public isValid() {
        isValid(createQuestionScheme, this);
    }
}

export class createQuestionResponse {
    public id_question: number;

    public constructor(id_question: number) {
        this.id_question = id_question;
    }
}

export class getQuestionDTO {
    public id_user: string;
    public id_quiz: number;
    public id_question: number;

    public constructor(id_user: string, id_quiz: number, id_question: number) {
        this.id_user = id_user;
        this.id_quiz = id_quiz;
        this.id_question = id_question;
    }

    public isValid() {
        isValid(getQuestionScheme, this);
    }
}

export class getQuestionResponse {
    public question: QuestionRequest;

    public constructor(question: QuestionRequest) {
        this.question = question;
    }
}

export class deleteQuestionDTO {
    public id_user: string;
    public id_quiz: number;
    public id_question: number;

    public constructor(id_user: string, id_quiz: number, id_question: number) {
        this.id_user = id_user;
        this.id_quiz = id_quiz;
        this.id_question = id_question;
    }

    public isValid() {
        isValid(deleteQuestionScheme, this);
    }
}

export type QuestionUpdate = Omit<
    QuestionRequest,
    'id' | 'id_user_owner' | 'id_quiz_owner' | 'date_modify'
>;

export class updateQuestionDTO {
    public id_user: string;
    public id_quiz: number;
    public id_question: number;
    public question: QuestionUpdate;

    public constructor(
        id_user: string,
        id_quiz: number,
        id_question: number,
        question: QuestionUpdate,
    ) {
        this.id_user = id_user;
        this.id_quiz = id_quiz;
        this.id_question = id_question;
        this.question = question;
    }

    public isValid() {
        isValid(updateQuestionScheme, this);
    }
}

export type getListOfQuestionsFilter = Partial<
    Omit<
        QuestionRequest,
        'id' | 'id_user_owner' | 'id_quiz_owner' | 'date_modify' | 'date'
    >
>;

export type getListOfQuestionsOrder = getOrder<
    'date_modify' | 'title' | 'is_show'
>;

export class getListOfQuestionsDTO {
    public id_user: string;
    public id_quiz: number;
    public page: number;
    public filter: getListOfQuestionsFilter;
    public order: getListOfQuestionsOrder;

    public constructor(
        page: number,
        id_user: string,
        id_quiz: number,
        filter: getListOfQuestionsFilter,
        order: getListOfQuestionsOrder,
    ) {
        this.page = page;
        this.id_user = id_user;
        this.id_quiz = id_quiz;
        this.filter = filter;
        this.order = order;
    }

    public isValid() {
        isValid(getListOfQuestionsScheme, this);
    }
}

export class getListOfQuestionsResponse {
    public questions: QuestionRequest[];
    public count: number;

    public constructor(questions: QuestionRequest[], count: number) {
        this.questions = questions;
        this.count = count;
    }
}
