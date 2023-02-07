import { date, object, string } from 'yup';
import { Valid } from '../../exceptions/valid';
import { Exceptions } from '../../exceptions/exceptions';

export const createQuizScheme = object({
    id_owner: Valid.id_user.required(Exceptions.IdOwnerRequired),
    name: Valid.name.required(Exceptions.NameRequired),
    title: Valid.title.required(Exceptions.TitleRequired),
    description: string(),
    intro_url: Valid.intro_url,
    date_create: Valid.date_create.default(new Date()),
    ttl: Valid.ttl.nullable(),
    tts: date().nullable(),
    tte: date().nullable(),
});

export const getQuizzesScheme = object({
    id_owner: Valid.id_user.required(Exceptions.IdOwnerRequired),
    page: Valid.page.required(Exceptions.PageRequired),
});

export const deleteQuizScheme = object({
    id: Valid.id_quiz.required(Exceptions.IdRequired),
    id_owner: Valid.id_user.required(Exceptions.IdOwnerRequired),
});

export const updateQuizScheme = object({
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
    }),
});
