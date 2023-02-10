import { boolean, object } from 'yup';
import {ValidAlias, ValidCodes} from "../../exceptions/valid";

export const registerSchemeDTO = object({
    login: ValidAlias.login.required(() => ValidCodes.LoginRequired),
    password: ValidAlias.password.required(() => ValidCodes.PasswordRequired),
    is_staff: boolean().default(false),
    is_admin: boolean().default(false),
    phone: ValidAlias.phone.nullable(),
    email: ValidAlias.email.required(() => ValidCodes.EmailRequired),
    username: ValidAlias.username.required(() => ValidCodes.UsernameRequired),
    first_name: ValidAlias.first_name.required(() => ValidCodes.FirstNameRequired),
    second_name: ValidAlias.second_name.required(() => ValidCodes.SecondNameRequired),
    avatar_url: ValidAlias.avatar_url.nullable(),
    day_of_birth: ValidAlias.day_of_birth.nullable(),
    gender: ValidAlias.gender,
});

export const loginSchemeDTO = object({
    login: ValidAlias.login.required(() => ValidCodes.LoginRequired),
    password: ValidAlias.password.required(() => ValidCodes.PasswordRequired),
});
