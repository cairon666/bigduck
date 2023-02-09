import { date, number, string } from 'yup';
import { Exceptions } from './exceptions';

export const Valid = {
    id_user: string().uuid(Exceptions.IdUserNotUUID),
    id_quiz: number().positive(Exceptions.IdQuizMin),
    id_question: number().positive(Exceptions.IdQuestionMin),
    login: string()
        .min(4, Exceptions.LoginShort)
        .matches(
            /^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{0,19}$/,
            Exceptions.LoginInvalid,
        ),
    password: string()
        .min(4, Exceptions.PasswordShort)
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            Exceptions.PasswordInvalid,
        ),
    email: string().email(Exceptions.EmailInvalid),
    username: string().min(4, Exceptions.UsernameShort),
    first_name: string().min(4, Exceptions.FirstNameShort),
    second_name: string().min(4, Exceptions.SecondNameShort),
    name: string().min(4, Exceptions.NameShort),
    avatar_url: string(),
    intro_url: string(),
    day_of_birth: date(),
    gender: string().oneOf(['male', 'female']), // TODO: add to db model
    phone: string(),
    title: string().min(4),
    date_create: date(),
    ttl: string(),
    page: number().min(1, Exceptions.PageMin),
};
