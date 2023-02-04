import {EntityManager, QueryFailedError, Repository} from "typeorm";
import {Credential} from "../../../db/postgres/credential.models";
import {User} from "../../../db/postgres/user.models";
import {LoginDTO, LoginResponseDTO, RegisterDTO, RegisterResponseDTO} from "./dto";
import {AlreadyExistError, AuthBadId, AuthBadPassword, AuthNotFound, UnknownError} from "../../exceptions/exceptions";
import {v4 as uuidv4} from 'uuid';
import {Beda} from "../../../../pkg/beda/Beda";
import {CodeError} from "../../exceptions/codes";
import {Logger} from "../../../../pkg/logger";

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

    async Register(dto: RegisterDTO): Promise<RegisterResponseDTO> {
        dto.isValid()

        const credential = new Credential(uuidv4(), dto.login, dto.password)
        const user = new User(
            credential.id,
            dto.first_name,
            dto.second_name,
            new Date(),
            new Date(),
            false,
            false,
            false,
            dto.email,
        )

        try {
            await this.managerStorage.transaction(async (mgr) => {
                await mgr.insert(Credential, credential)
                await mgr.insert(User, user)
            })
        } catch (e) {
            if (e instanceof QueryFailedError) {
                const regexp = /Key \(([a-zA-Z_]+)\)=\(([a-zA-Z0-9_]+)\) already exists./
                const result = (e.driverError.detail as string).match(regexp)

                if (result != null) {
                    throw new Beda(AlreadyExistError(result[1]), CodeError.AlreadyExist)
                } else {
                    this.logger.error({
                        "not_handle_error": e,
                    })
                    throw new Beda(UnknownError, CodeError.Unknown)
                }
            } else {
                this.logger.error({
                    "not_handle_error": e,
                })
                throw new Beda(UnknownError, CodeError.Unknown)
            }
        }


        return new RegisterResponseDTO(credential.id)
    }

    async Login(dto: LoginDTO): Promise<LoginResponseDTO> {
        dto.isValid()

        let resC: Credential | null
        try {
            resC = await this.managerStorage.findOne(Credential, {
                where: {
                    login: dto.login,
                }
            })
        } catch (e) {
            this.logger.error({
                "not_handle_error": e,
            })
            throw new Beda(UnknownError, CodeError.Unknown)
        }

        if (!resC) {
            throw new Beda(AuthNotFound, CodeError.AuthNotFound)
        }

        if (resC.password_hash !== dto.password) {
            throw new Beda(AuthBadPassword, CodeError.AuthBadPassword)
        }

        if (!resC.id) {
            throw new Beda(AuthBadId, CodeError.AuthBadId)
        }

        let resU: User | null
        try {
            resU = await this.managerStorage.findOne(User, {
                where: {
                    id: resC.id,
                }
            })
        } catch (e) {
            this.logger.error({
                "not_handle_error": e,
            })
            throw new Beda(UnknownError, CodeError.Unknown)
        }

        if (!resU) {
            this.logger.error({
                "not_handle_error": "dont found user after credential",
            })
            throw new Beda(UnknownError, CodeError.Unknown)
        }

        return new LoginResponseDTO(
            resC.id,
            resU.is_staff,
            resU.is_admin,
        )
    }
}