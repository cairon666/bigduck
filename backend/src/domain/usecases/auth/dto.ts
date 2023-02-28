import { UserModelGender } from '../../models';

export class AuthLoginDTO {
    public constructor(public login: string, public password: string) {}

    public async isValid(): Promise<void> {
        return;
    }
}

export class AuthLoginResponseDTO {
    public constructor(
        public id: string,
        public access_token: string,
        public refresh_token: string,
    ) {}
}

export class AuthRegisterDTO {
    public login: string;
    public password: string;
    public email: string;
    public username: string;
    public first_name: string;
    public second_name: string;
    public day_of_birth: Date | null;
    public gender: UserModelGender | null;

    public constructor(props: {
        login: string;
        password: string;
        email: string;
        username: string;
        first_name: string;
        second_name: string;
        day_of_birth: Date | null;
        gender: UserModelGender | null;
    }) {
        this.login = props.login;
        this.password = props.password;
        this.email = props.email;
        this.username = props.username;
        this.first_name = props.first_name;
        this.second_name = props.second_name;
        this.day_of_birth = props.day_of_birth;
        this.gender = props.gender;
    }

    public async isValid(): Promise<void> {
        return;
    }
}

export class AuthRegisterResponseDTO {}


export class AuthRefreshDTO {
    public constructor(public refresh: string) {}

    public async isValid(): Promise<void> {
        return;
    }
}

export class AuthRefreshResponseDTO {
    public constructor(
        public access_token: string,
        public refresh_token: string,
    ) {}
}