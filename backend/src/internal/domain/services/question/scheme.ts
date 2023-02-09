import { boolean, object, string } from 'yup';
import { Valid } from '../../exceptions/valid';
import { Exceptions } from '../../exceptions/exceptions';

const question = object({
    title: Valid.title.required(Exceptions.TitleRequired),
    type: string().required('type required'),
    data: object().required('data required'),
    is_show: boolean(),
}).test('type_data', 'type_data error', function (value) {
    const { path, createError } = this;
    const type = value?.type;

    if (type && typeof value.data === 'object') {
        if (typeof value.data.title !== 'string') {
            return createError({ path, message: Exceptions.TypeDataUnknown });
        }

        if (typeof value.data.description !== 'string') {
            return createError({ path, message: Exceptions.TypeDataUnknown });
        }

        switch (type) {
            case 'choose_many': {
                return true;
            }
            case 'choose_one': {
                return true;
            }
            case 'input': {
                return true;
            }
        }
    }

    return createError({ path, message: Exceptions.TypeDataUnknown });
});

export const createQuestionScheme = object({
    id_user: Valid.id_user.required(Exceptions.IdUserRequired),
    id_quiz: Valid.id_quiz.required(Exceptions.IdQuizRequired),
    question: question,
});

export const getQuestionScheme = object({
    id_user: Valid.id_user.required(Exceptions.IdUserRequired),
    id_quiz: Valid.id_quiz.required(Exceptions.IdQuizRequired),
    id_question: Valid.id_question.required(Exceptions.IdQuestionRequired),
});

export const deleteQuestionScheme = object({
    id_user: Valid.id_user.required(Exceptions.IdUserRequired),
    id_quiz: Valid.id_quiz.required(Exceptions.IdQuizRequired),
    id_question: Valid.id_question.required(Exceptions.IdQuestionRequired),
});

export const updateQuestionScheme = object({
    id_user: Valid.id_user.required(Exceptions.IdUserRequired),
    id_quiz: Valid.id_quiz.required(Exceptions.IdQuizRequired),
    id_question: Valid.id_question.required(Exceptions.IdQuestionRequired),
    question: question,
});

export const getListOfQuestionsScheme = object({
    id_user: Valid.id_user.required(Exceptions.IdUserRequired),
    id_quiz: Valid.id_quiz.required(Exceptions.IdQuizRequired),
    page: Valid.page.required(Exceptions.PageRequired),
    filter: object(),
    order: object(),
});
