import Duration from "@icholy/duration";
import {date, object, string, ValidationError} from "yup";
import {Beda} from "../../../../pkg/beda/Beda";
import {CodeError, Exceptions} from "../../exceptions/exceptions";
import {Valid} from "../../exceptions/valid";

export interface Quiz {
    id: number,
    id_owner: string,
    name: string,
    title: string,
    description: string,
    intro_url: string,
    date_create: Date,
    ttl: string | null,
    tts: Date | null,
    tte: Date | null,
}

const createQuizScheme = object({
    id_owner: Valid.id_user.required(Exceptions.IdOwnerRequired),
    name: Valid.name.required(Exceptions.NameRequired),
    title: Valid.title.required(Exceptions.TitleRequired),
    description: string(),
    intro_url: Valid.intro_url,
    date_create: Valid.date_create.default(new Date()),
    ttl: Valid.ttl.nullable(),
    tts: date().nullable(),
    tte: date().nullable(),
})

export class createQuizDTO {
    public id_owner: string
    public name: string
    public title: string
    public description: string
    public intro_url: string
    public date_create: Date
    public ttl: Duration | null
    public tts: Date | null
    public tte: Date | null

    constructor(
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
        this.id_owner = id_owner
        this.name = name
        this.title = title
        this.description = description
        this.intro_url = intro_url
        this.date_create = date_create
        this.ttl = ttl
        this.tts = tts
        this.tte = tte
    }

    isValid() {
        try {
            createQuizScheme.validateSync(this, {abortEarly: false})
        } catch (e) {
            const err = new Beda(Exceptions.Validate, CodeError.Valid)
            if (e instanceof ValidationError) {
                e.errors.forEach((error) => {
                    err.addDesc(error)
                })
            }
            throw err
        }
    }
}

export class createQuizResponseDTO {
    public id: number

    constructor(id: number) {
        this.id = id
    }
}

export type OrderType = "DESC" | "ASC"

export interface getQuizzesFilter {
    name?: string
    title?: string
    description?: string
}

export type getQuizzesOrder = Partial<Record<"date_create" | "name" | "title" | "description" | "ttl", OrderType>>

const getQuizzesScheme = object({
    id_owner: Valid.id_user.required(Exceptions.IdOwnerRequired),
    page: Valid.page.required(Exceptions.PageRequired),
})

export class getQuizzesDTO {
    public id_owner: string
    public page: number
    public filter: getQuizzesFilter
    public order: getQuizzesOrder

    constructor(
        id_owner: string,
        page: number,
        filter: getQuizzesFilter,
        order: getQuizzesOrder
    ) {
        this.id_owner = id_owner
        this.page = page
        this.filter = filter
        this.order = order
    }

    isValid() {
        try {
            getQuizzesScheme.validateSync(this, {abortEarly: false})
        } catch (e) {
            const err = new Beda(Exceptions.Validate, CodeError.Valid)
            if (e instanceof ValidationError) {
                e.errors.forEach((error) => {
                    err.addDesc(error)
                })
            }
            throw err
        }
    }
}

export class getQuizzesResponseDTO {
    public quizzes: Quiz[]
    public count: number

    constructor(
        quizzes: Quiz[],
        count: number
    ) {
        this.quizzes = quizzes
        this.count = count
    }
}

const deleteQuizScheme = object({
    id: Valid.id_quiz.required(Exceptions.IdRequired),
    id_owner: Valid.id_user.required(Exceptions.IdOwnerRequired)
})

export class deleteQuizDTO {
    public id: number
    public id_owner: string

    constructor(
        id: number,
        id_owner: string
    ) {
        this.id = id
        this.id_owner = id_owner
    }

    isValid() {
        try {
            deleteQuizScheme.validateSync(this, {abortEarly: false})
        } catch (e) {
            const err = new Beda(Exceptions.Validate, CodeError.Valid)
            if (e instanceof ValidationError) {
                e.errors.forEach((error) => {
                    err.addDesc(error)
                })
            }
            throw err
        }
    }
}

export interface updateQuizSet {
    name: string
    title: string
    description: string
    intro_url: string
    ttl: Duration | null
    tts: Date | null
    tte: Date | null
}

const updateQuizScheme = object({
    id_quiz: Valid.id_quiz.required(Exceptions.IdQuizRequired),
    id_owner: Valid.id_user.required(Exceptions.IdOwnerRequired),
    set: object({
        name: Valid.name.required(Exceptions.NameRequired),
        title: Valid.title.required(Exceptions.TitleRequired),
        description: string(),
        intro_url: Valid.intro_url,
        ttl: Valid.ttl.nullable(),
        tts: date().nullable(),
        tte: date().nullable(),
    })
})

export class updateQuizDTO {
    public id_quiz: number
    public id_owner: string
    public set: updateQuizSet

    constructor(
        id_quiz: number,
        id_owner: string,
        set: updateQuizSet
    ) {
        this.id_quiz = id_quiz
        this.id_owner = id_owner
        this.set = set
    }

    isValid() {
        try {
            updateQuizScheme.validateSync(this, {abortEarly: false})
        } catch (e) {
            const err = new Beda(Exceptions.Validate, CodeError.Valid)
            if (e instanceof ValidationError) {
                e.errors.forEach((error) => {
                    err.addDesc(error)
                })
            }
            throw err
        }
    }
}
