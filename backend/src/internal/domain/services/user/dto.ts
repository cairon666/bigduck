import { isValid } from '../utils';
import { getUserScheme, updateUserScheme } from './scheme';
import {User} from "../../models/user";

export class updateUserDTO {
    public id: string;
    public set: Omit<User, "id">

    public constructor(
        id: string,
        set: Omit<User, "id">
    ) {
        this.id = id;
        this.set = set
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


export class getUserRequestDTO {
    public user: User;

    public constructor(user: User) {
        this.user = user;
    }
}
