import { isValid } from '../utils';
import { loginSchemeDTO, registerSchemeDTO } from './scheme';

export class RegisterDTO {
    public login: string;
    public password: string;
    public is_staff: boolean;
    public is_admin: boolean;
    public phone: string | null;
    public email: string;
    public username: string;
    public first_name: string;
    public second_name: string;
    public avatar_url: string | null;
    public day_of_birth: Date | null;
    public gender: string | null;

    public constructor(
        login: string,
        password: string,
        is_staff: boolean,
        is_admin: boolean,
        phone: string | null,
        email: string,
        username: string,
        first_name: string,
        second_name: string,
        avatar_url: string | null,
        day_of_birth: Date | null,
        gender: string | null,
    ) {
        this.login = login;
        this.password = password;
        this.is_staff = is_staff;
        this.is_admin = is_admin;
        this.phone = phone;
        this.email = email;
        this.username = username;
        this.first_name = first_name;
        this.second_name = second_name;
        this.avatar_url = avatar_url;
        this.day_of_birth = day_of_birth;
        this.gender = gender;
    }

    public isValid() {
        isValid(registerSchemeDTO, this);
    }
}

export class LoginDTO {
    public login: string;
    public password: string;

    public constructor(login: string, password: string) {
        this.login = login;
        this.password = password;
    }

    public isValid() {
        isValid(loginSchemeDTO, this);
    }
}

interface UserResponse {
    id: string;
    username: string;
    first_name: string;
    second_name: string;
    avatar_url: string | null;
    day_of_birth: Date | null;
    gender: string | null;
}

export class LoginResponseDTO {
    public is_staff: boolean;
    public is_admin: boolean;
    public user: UserResponse

    public constructor(is_staff: boolean, is_admin: boolean, user: UserResponse) {
        this.is_staff = is_staff;
        this.is_admin = is_admin;
        this.user = user
    }
}
