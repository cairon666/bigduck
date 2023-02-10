import { boolean, date, object, string } from 'yup';
import { ValidAlias, ValidCodes} from '../../exceptions/valid';

export const createQuizScheme = object({
    id_owner: ValidAlias.id_user.required(() => ValidCodes.IdUserRequired),
    quiz: object({
        name: ValidAlias.name.required(() => ValidCodes.NameRequired),
        title: ValidAlias.title.required(() => ValidCodes.TitleRequired),
        description: string(),
        intro_url: ValidAlias.intro_url,
        ttl: ValidAlias.ttl.nullable(),
        tts: date().nullable(),
        tte: date().nullable(),
        is_show: boolean(),
        is_strict: boolean(),
        is_random: boolean(),
    }),
});

export const getQuizzesScheme = object({
    id_owner: ValidAlias.id_user.required(() => ValidCodes.IdUserRequired),
    page: ValidAlias.page.required(() => ValidCodes.PageRequired),
});

export const deleteQuizScheme = object({
    id: ValidAlias.id_quiz.required(() => ValidCodes.IdQuizRequired),
    id_owner: ValidAlias.id_user.required(() => ValidCodes.IdUserRequired),
});

export const updateQuizScheme = object({
    id_quiz: ValidAlias.id_quiz.required(() => ValidCodes.IdQuizRequired),
    id_owner: ValidAlias.id_user.required(() => ValidCodes.IdUserRequired),
    set: object({
        name: ValidAlias.name.required(() => ValidCodes.NameRequired),
        title: ValidAlias.title.required(() => ValidCodes.TitleRequired),
        description: string(),
        intro_url: ValidAlias.intro_url,
        ttl: ValidAlias.ttl.nullable(),
        tts: date().nullable(),
        tte: date().nullable(),
        is_show: boolean(),
        is_strict: boolean(),
        is_random: boolean(),
    }),
});

export const getQuizScheme = object({
    id_user: ValidAlias.id_user.required(() => ValidCodes.IdUserRequired),
    id_quiz: ValidAlias.id_quiz.required(() => ValidCodes.IdQuizRequired),
});
