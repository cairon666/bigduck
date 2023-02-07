import Duration from '@icholy/duration';
import {getOrder, isValid, OrderType} from '../utils';
import {
    createQuizScheme,
    deleteQuizScheme,
    getQuizzesScheme,
    updateQuizScheme,
} from './scheme';

export interface Quiz {
    id: number;
    id_owner: string;
    name: string;
    title: string;
    description: string;
    intro_url: string;
    date_create: Date;
    ttl: string | null;
    tts: Date | null;
    tte: Date | null;
}

export class createQuizDTO {
    public id_owner: string;
    public name: string;
    public title: string;
    public description: string;
    public intro_url: string;
    public date_create: Date;
    public ttl: Duration | null;
    public tts: Date | null;
    public tte: Date | null;

    public constructor(
        id_owner: string,
        name: string,
        title: string,
        description: string,
        intro_url: string,
        date_create: Date,
        ttl: Duration | null,
        tts: Date | null,
        tte: Date | null,
    ) {
        this.id_owner = id_owner;
        this.name = name;
        this.title = title;
        this.description = description;
        this.intro_url = intro_url;
        this.date_create = date_create;
        this.ttl = ttl;
        this.tts = tts;
        this.tte = tte;
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
}

export type getQuizzesOrder = getOrder<'date_create' | 'name' | 'title' | 'description' | 'ttl'>

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
