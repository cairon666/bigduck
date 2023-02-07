import { isValid } from '../utils';
import { getUserScheme, updateUserScheme } from './scheme';

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
        isValid(updateUserScheme, this);
    }
}

export class getUserDTO {
    public id: string;

    public constructor(id: string) {
        this.id = id;
    }

    public isValid() {
        isValid(getUserScheme, this);
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
