import { object } from 'yup';
import { Valid } from '../../exceptions/valid';
import { Exceptions } from '../../exceptions/exceptions';

export const updateUserScheme = object({
    username: Valid.username.required(Exceptions.UsernameRequired),
    first_name: Valid.first_name.required(Exceptions.FirstNameRequired),
    second_name: Valid.second_name.required(Exceptions.SecondNameRequired),
    avatar_url: Valid.avatar_url.nullable(),
    day_of_birth: Valid.day_of_birth.nullable(),
    gender: Valid.gender.nullable(),
});

export const getUserScheme = object({
    id: Valid.id_user.required(Exceptions.IdRequired),
});
