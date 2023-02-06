import { object, ValidationError } from 'yup';
import { Beda } from '../../../../pkg/beda/Beda';
import { CodeError, Exceptions } from '../../exceptions/exceptions';
import { Valid } from '../../exceptions/valid';

const updateUserScheme = object({
    username: Valid.username.required(Exceptions.UsernameRequired),
    first_name: Valid.first_name.required(Exceptions.FirstNameRequired),
    second_name: Valid.second_name.required(Exceptions.SecondNameRequired),
    avatar_url: Valid.avatar_url.nullable(),
    day_of_birth: Valid.day_of_birth.nullable(),
    gender: Valid.gender.nullable(),
});

export class updateUserDTO {
    public id: string;
    public username: string;
    public first_name: string;
    public second_name: string;
    public avatar_url: string | null;
    public day_of_birth: Date | null;
    public gender: string | null;

    public constructor(
        id: string,
        username: string,
        first_name: string,
        second_name: string,
        avatar_url: string | null,
        day_of_birth: Date | null,
        gender: string | null,
    ) {
        this.id = id;
        this.username = username;
        this.first_name = first_name;
        this.second_name = second_name;
        this.avatar_url = avatar_url;
        this.day_of_birth = day_of_birth;
        this.gender = gender;
    }

    public isValid() {
        try {
            updateUserScheme.validateSync(this, { abortEarly: false });
        } catch (e) {
            const err = new Beda(Exceptions.Validate, CodeError.Valid);
            if (e instanceof ValidationError) {
                e.errors.forEach((error) => {
                    err.addDesc(error);
                });
            }
            throw err;
        }
    }
}

const getUserScheme = object({
    id: Valid.id_user.required(Exceptions.IdRequired),
});

export class getUserDTO {
    public id: string;

    public constructor(id: string) {
        this.id = id;
    }

    public isValid() {
        try {
            getUserScheme.validateSync(this, { abortEarly: false });
        } catch (e) {
            const err = new Beda(Exceptions.Validate, CodeError.Valid);
            if (e instanceof ValidationError) {
                e.errors.forEach((error) => {
                    err.addDesc(error);
                });
            }
            throw err;
        }
    }
}

export interface UserResponse {
    id: string;
    username: string;
    first_name: string;
    second_name: string;
    avatar_url: string | null;
    day_of_birth: Date | null;
    gender: string | null;
}

export class getUserRequestDTO {
    public user: UserResponse;

    public constructor(user: UserResponse) {
        this.user = user;
    }
}
