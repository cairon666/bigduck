import {LoginDTO, LoginResponseDTO, RegisterDTO} from './dto';
import {v4 as uuidv4} from 'uuid';
import {compareSync, genSaltSync, hashSync} from 'bcryptjs';
import {DatabaseCodes} from "../../exceptions/database";
import {bedaDatabase} from "../utils";
import {Credential, User, UserLoginResponse} from "../../models/user";

export interface AuthRepo {
    register(c: Credential, u: User): Promise<void>
    login(login: string): Promise<UserLoginResponse | null>
}

export class AuthService {
    private authRepo: AuthRepo

    public constructor(authRepo: AuthRepo) {
        this.authRepo = authRepo;
    }

    public async Register(dto: RegisterDTO) {
        dto.isValid();

        const hash_password = hashSync(dto.password, genSaltSync(10));
        const uuid = uuidv4();

        await this.authRepo.register({
            id: uuid,
            login: dto.login,
            password_hash: hash_password,
            is_staff: dto.is_staff,
            is_admin: dto.is_admin,
            phone: dto.phone,
            email: dto.email,
        }, {
            id: uuid,
            username: dto.username,
            first_name: dto.first_name,
            second_name: dto.second_name,
            avatar_url: dto.avatar_url,
            day_of_birth: dto.day_of_birth,
            gender: dto.gender,
        })
    }

    public async Login(dto: LoginDTO): Promise<LoginResponseDTO> {
        dto.isValid();

        const resp = await this.authRepo.login(dto.login)

        if (!resp) {
            throw bedaDatabase(DatabaseCodes.NotFound)
        }

        if (!compareSync(dto.password, resp.password_hash)) {
            throw bedaDatabase(DatabaseCodes.AuthBadPassword)
        }

        return new LoginResponseDTO(resp.is_staff, resp.is_admin, resp.user);
    }
}
