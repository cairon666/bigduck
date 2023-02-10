import { boolean, object, string } from 'yup';
import { ValidAlias, ValidCodes} from '../../exceptions/valid';

const question = object({
    title: ValidAlias.title.required(() => ValidCodes.TitleRequired),
    type: string().required('type required'),
    data: object().required('data required'),
    is_show: boolean(),
}).test('type_data', 'type_data error', function (value) {
    const { path, createError } = this;
    const type = value?.type;

    if (type && typeof value.data === 'object') {
        switch (type) {
            case 'choose_many': {
                if (typeof value.data.answer_id !== 'object' || !Array.isArray(value.data.answer_id)) {
                    return createError({ path, message: "answer_id is array" }); // TODO
                }

                return true;
            }
            case 'choose_one': {
                if (typeof value.data.answer_id !== 'number') {
                    return createError({ path, message: "answer_id is number" }); // TODO
                }

                return true;
            }
            case 'input': {
                return true;
            }
        }
    }

    return createError({ path, message: "TODO" }); // TODO
});

export const createQuestionScheme = object({
    id_user: ValidAlias.id_user.required(() => ValidCodes.IdUserRequired),
    id_quiz: ValidAlias.id_quiz.required(() => ValidCodes.IdQuizRequired),
    question: question,
});

export const getQuestionScheme = object({
    id_user: ValidAlias.id_user.required(() => ValidCodes.IdUserRequired),
    id_quiz: ValidAlias.id_quiz.required(() => ValidCodes.IdQuizRequired),
    id_question: ValidAlias.id_question.required(() => ValidCodes.IdQuestionRequired),
});

export const deleteQuestionScheme = object({
    id_user: ValidAlias.id_user.required(() => ValidCodes.IdUserRequired),
    id_quiz: ValidAlias.id_quiz.required(() => ValidCodes.IdQuizRequired),
    id_question: ValidAlias.id_question.required(() => ValidCodes.IdQuestionRequired),
});

export const updateQuestionScheme = object({
    id_user: ValidAlias.id_user.required(() => ValidCodes.IdUserRequired),
    id_quiz: ValidAlias.id_quiz.required(() => ValidCodes.IdQuizRequired),
    id_question: ValidAlias.id_question.required(() => ValidCodes.IdQuestionRequired),
    question: question,
});

export const getListOfQuestionsScheme = object({
    id_user: ValidAlias.id_user.required(() => ValidCodes.IdUserRequired),
    id_quiz: ValidAlias.id_quiz.required(() => ValidCodes.IdQuizRequired),
    page: ValidAlias.page.required(() => ValidCodes.PageRequired),
    filter: object(),
    order: object(),
});
