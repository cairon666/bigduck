import {EntityManager, QueryFailedError} from "typeorm";
import {Credential} from "../../../db/postgres/credential.models";
import {User} from "../../../db/postgres/user.models";
import {LoginDTO, LoginResponseDTO, RegisterDTO} from "./dto";
import {
    AlreadyExistError,
    AuthBadId,
    AuthBadPassword,
    AuthNotFound,
    Exceptions,
    UnknownError
} from "../../exceptions/exceptions";
import {v4 as uuidv4} from 'uuid';
import {Beda} from "../../../../pkg/beda/Beda";
import {CodeError} from "../../exceptions/codes";
import {Logger} from "../../../../pkg/logger";
import {compareSync, genSaltSync, hashSync} from "bcryptjs";

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
                this.logger.error({"not_handle_error": e})
                throw new Beda(Exceptions.RegisterDatabase, CodeError.RegisterDatabase)
            }

            this.logger.error({"not_handle_error": e})
            throw new Beda(Exceptions.UnknownDatabase, CodeError.UnknownDatabase)
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
            throw new Beda(Exceptions.LoginDatabase, CodeError.LoginDatabase)
        }

        if (!cred) {
            throw new Beda(Exceptions.LoginNotFound, CodeError.LoginNotFound)
        }

        if (!compareSync(dto.password, cred.password_hash)) {
            throw new Beda(Exceptions.LoginBadPassword, CodeError.LoginBadPassword)
        }

        return new LoginResponseDTO(
            cred.id,
            cred.is_staff,
            cred.is_admin,
        )
    }
}