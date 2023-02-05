import {EntityManager, QueryFailedError} from "typeorm";
import {Credential} from "../../../db/postgres/credential.models";
import {User} from "../../../db/postgres/user.models";
import {LoginDTO, LoginResponseDTO, RegisterDTO} from "./dto";
import {CodeError, Exceptions} from "../../exceptions/exceptions";
import {v4 as uuidv4} from 'uuid';
import {Beda} from "../../../../pkg/beda/Beda";
import {Logger} from "../../../../pkg/logger";
import {compareSync, genSaltSync, hashSync} from "bcryptjs";
import {PG_UNIQUE_VIOLATION} from "@drdgvhbh/postgres-error-codes";

export class AuthService {
    private managerStorage: EntityManager
    private logger: Logger

    constructor(
        logger: Logger,
        managerStorage: EntityManager,
    ) {
        this.managerStorage = managerStorage
        this.logger = logger
    }

    public async Register(dto: RegisterDTO) {
        dto.isValid()

        const hash_password = hashSync(dto.password, genSaltSync(10));
        console.log(hash_password)
        const uuid = uuidv4()

        const credential = new Credential(
            uuid,
            dto.login,
            hash_password,
            dto.is_staff,
            dto.is_admin,
            dto.phone,
            dto.email,
        )
        const user = new User(
            uuid,
            dto.username,
            dto.first_name,
            dto.second_name,
            dto.avatar_url,
            dto.day_of_birth,
            dto.gender,
        )

        try {
            await this.managerStorage.transaction(async (mgr) => {
                await mgr.insert(Credential, credential)
                await mgr.insert(User, user)
            })
        } catch (e) {
            if (e instanceof QueryFailedError) {
                const err: any = e
                switch (err.code) {
                    case PG_UNIQUE_VIOLATION:
                        switch (err.constraint) {
                            case "users_username_uniq":
                                throw new Beda(Exceptions.UsernameAlreadyExist, CodeError.AlreadyExist)
                            case "credentials_login_uniq":
                                throw new Beda(Exceptions.LoginAlreadyExist, CodeError.AlreadyExist)
                            case "credentials_email_uniq":
                                throw new Beda(Exceptions.EmailAlreadyExist, CodeError.AlreadyExist)
                            default:
                                throw new Beda(Exceptions.SomeAlreadyExist, CodeError.AlreadyExist)
                        }
                    default:
                        throw new Beda(Exceptions.Database, CodeError.Database)
                }
            }
            throw new Beda(Exceptions.Database, CodeError.Database)
        }
    }

    public async Login(dto: LoginDTO): Promise<LoginResponseDTO> {
        dto.isValid()

        let cred: Credential | null
        try {
            cred = await this.managerStorage.findOne(Credential, {
                where: {
                    login: dto.login,
                }
            })
        } catch (e) {
            this.logger.error({"not_handle_error": e})
            throw new Beda(Exceptions.Database, CodeError.Database)
        }

        if (!cred) {
            throw new Beda(Exceptions.NotFound, CodeError.NotFound)
        }

        if (!compareSync(dto.password, cred.password_hash)) {
            throw new Beda(Exceptions.BadPassword, CodeError.BadPassword)
        }

        return new LoginResponseDTO(
            cred.id,
            cred.is_staff,
            cred.is_admin,
        )
    }
}