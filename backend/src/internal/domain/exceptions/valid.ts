import {date, number, string} from 'yup';

export enum ValidCodes {
    LoginRequired = 1,
    LoginInvalid,
    LoginShort,
    PasswordRequired,
    PasswordShort,
    PasswordBad,
    PasswordInvalid,
    EmailRequired,
    EmailInvalid,
    FirstNameRequired,
    FirstNameShort,
    SecondNameRequired,
    SecondNameShort,
    NameRequired,
    NameShort,
    TitleRequired,
    UsernameShort,
    UsernameRequired,
    IdUserNotUUID,
    IdUserRequired,
    IdQuizRequired,
    IdQuizMin,
    IdQuestionMin,
    IdQuestionRequired,
    PageMin,
    PageRequired,
    GenderInvalid
}

export const ValidErrors: Record<ValidCodes, string> = {
    // login
    [ValidCodes.LoginRequired]: "login is required",
    [ValidCodes.LoginInvalid]: "login must ends with a letter or digit, must starts with a letter, chars according to the pattern present inside the char class",
    [ValidCodes.LoginShort]: "login is short",
    // password
    [ValidCodes.PasswordRequired]: "password is required",
    [ValidCodes.PasswordShort]: "password is short",
    [ValidCodes.PasswordBad]: "bad password",
    [ValidCodes.PasswordInvalid]: "password must contain at least 8 characters, one uppercase, one number and one special case character",
    // email
    [ValidCodes.EmailRequired]: "email is required",
    [ValidCodes.EmailInvalid]: "email is invalid",
    // first name
    [ValidCodes.FirstNameRequired]: "first_name is required",
    [ValidCodes.FirstNameShort]: "first_name is short",
    // second name
    [ValidCodes.SecondNameRequired]: "second_name is required",
    [ValidCodes.SecondNameShort]: "second_name is short",
    // name
    [ValidCodes.NameRequired]:  'name is required',
    [ValidCodes.NameShort]: 'name is short',
    // title
    [ValidCodes.TitleRequired]: 'title is required',
    // username
    [ValidCodes.UsernameShort]:  "username is short",
    [ValidCodes.UsernameRequired]: 'username is required',
    // id_user
    [ValidCodes.IdUserNotUUID]: 'id_user is uuid',
    [ValidCodes.IdUserRequired]: 'id_user is required',
    // id_quiz
    [ValidCodes.IdQuizRequired]: 'id_quiz is required',
    [ValidCodes.IdQuizMin]: 'id_quiz is positive',
    // id_question
    [ValidCodes.IdQuestionMin]: 'id_question is positive',
    [ValidCodes.IdQuestionRequired]: 'id_question is required',
// page
    [ValidCodes.PageMin]:  'page is positive',
    [ValidCodes.PageRequired]: 'page is required',
// gender
    [ValidCodes.GenderInvalid]: 'gender must be \'male\' or \'female\'',
}

export const ValidAlias = {
    id_user: string().uuid(() =>  ValidCodes.IdUserNotUUID),
    id_quiz: number().positive(() =>  ValidCodes.IdQuizMin),
    id_question: number().positive(() =>  ValidCodes.IdQuestionMin),
    login: string()
        .min(4, () =>  ValidCodes.LoginShort)
        .matches(
            /^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{0,19}$/,
            () =>  ValidCodes.LoginInvalid,
        ),
    password: string()
        .min(4, () =>  ValidCodes.PasswordShort)
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            () =>  ValidCodes.PasswordInvalid,
        ),
    email: string().email(() =>  ValidCodes.EmailInvalid),
    username: string().min(4, () =>  ValidCodes.UsernameShort),
    first_name: string().min(4, () =>  ValidCodes.FirstNameShort),
    second_name: string().min(4, () =>  ValidCodes.SecondNameShort),
    name: string().min(4, () =>  ValidCodes.NameShort),
    avatar_url: string(),
    intro_url: string(),
    day_of_birth: date(),
    gender: string()
        .nullable()
        .oneOf(['male', 'female', null],), // TODO: add to db model
    phone: string(),
    title: string().min(4),
    date_create: date(),
    ttl: string(),
    page: number().min(1, () => ValidCodes.PageMin),
};