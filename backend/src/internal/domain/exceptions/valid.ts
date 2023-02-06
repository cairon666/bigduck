import { date, number, object, string } from 'yup';
import { Exceptions } from './exceptions';

export const Valid = {
    id_user: string().uuid(Exceptions.IdNotUUID),
    id_quiz: number().positive(Exceptions.IdQuizMin),
    login: string().min(4, Exceptions.LoginShort),
    password: string().min(4, Exceptions.PasswordShort),
    email: string().email(Exceptions.EmailInvalid),
    username: string().min(4, Exceptions.UsernameShort),
    first_name: string().min(4, Exceptions.FirstNameShort),
    second_name: string().min(4, Exceptions.SecondNameShort),
    name: string().min(4, Exceptions.NameShort),
    avatar_url: string().default('https://domain.domain/default.avatar.url'),
    intro_url: string().default('https://domain.domain/default.intro.url'),
    day_of_birth: date(),
    gender: string(),
    phone: string(),
    title: string().min(4),
    date_create: date(),
    ttl: object(),
    page: number().min(1, Exceptions.PageMin),
};
