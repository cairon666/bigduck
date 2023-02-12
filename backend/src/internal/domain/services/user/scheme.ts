import { object } from 'yup';
import {ValidAlias, ValidCodes} from "../../exceptions/valid";

export const updateUserScheme = object({
    id: ValidAlias.id_user.required(() => ValidCodes.IdUserRequired),
    set: object({
        username: ValidAlias.username.required(() => ValidCodes.UsernameRequired),
        first_name: ValidAlias.first_name.required(() => ValidCodes.FirstNameRequired),
        second_name: ValidAlias.second_name.required(() => ValidCodes.SecondNameRequired),
        avatar_url: ValidAlias.avatar_url.nullable(),
        day_of_birth: ValidAlias.day_of_birth.nullable(),
        gender: ValidAlias.gender,
    })
});

export const getUserScheme = object({
    id: ValidAlias.id_user.required(() => ValidCodes.IdUserRequired),
});
