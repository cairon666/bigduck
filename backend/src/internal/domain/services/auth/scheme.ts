import { boolean, object } from 'yup';
import { Valid } from '../../exceptions/valid';
import { Exceptions } from '../../exceptions/exceptions';

export const registerSchemeDTO = object({
    login: Valid.login.required(Exceptions.LoginRequired),
    password: Valid.password.required(Exceptions.PasswordRequired),
    is_staff: boolean().default(false),
    is_admin: boolean().default(false),
    phone: Valid.phone.nullable(),
    email: Valid.email.required(Exceptions.EmailRequired),
    username: Valid.username.required(Exceptions.UsernameRequired),
    first_name: Valid.first_name.required(Exceptions.FirstNameRequired),
    second_name: Valid.second_name.required(Exceptions.SecondNameRequired),
    avatar_url: Valid.avatar_url.nullable(),
    day_of_birth: Valid.day_of_birth.nullable(),
    gender: Valid.gender.nullable(),
});

export const loginSchemeDTO = object({
    login: Valid.login.required(Exceptions.LoginRequired),
    password: Valid.password.required(Exceptions.PasswordRequired),
});
