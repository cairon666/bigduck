import {EntityManager, QueryFailedError, Repository} from "typeorm";
import {Credential} from "../../../db/postgres/credential.models";
import {User} from "../../../db/postgres/user.models";
import {LoginDTO, LoginResponseDTO, RegisterDTO, RegisterResponseDTO} from "./dto";
import {AlreadyExistError, AuthBadId, AuthBadPassword, AuthNotFound, UnknownError} from "../../exceptions/exceptions";
import {v4 as uuidv4} from 'uuid';

export class AuthService {
    private managerStorage: EntityManager

    constructor(
        managerStorage: EntityManager
    ) {
        this.managerStorage = managerStorage
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
                const regexp = /Key \(([a-zA-Z]+)\)=\(([a-zA-Z0-9]+)\) already exists./
                const result = (e.driverError.detail as string).match(regexp)
                if (result != null) {
                    throw Error(AlreadyExistError(result[1]))
                } else {
                    throw Error(UnknownError)
                }
            } else {
                console.log(e)
                throw e
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
            console.log(e)
            throw new Error(UnknownError)
        }

        if (!resC) {
            throw new Error(AuthNotFound)
        }

        if (resC.password_hash !== dto.password) {
            throw new Error(AuthBadPassword)
        }

        if (!resC.id) {
            throw new Error(AuthBadId)
        }

        let resU: User | null
        try {
            resU = await this.managerStorage.findOne(User, {
                where: {
                    id: resC.id,
                }
            })
        } catch (e) {
            console.log(e)
            throw new Error(UnknownError)
        }

        if (!resU) {
            console.log("dont found user after credential")
            throw new Error(UnknownError)
        }

        return new LoginResponseDTO(
            resC.id,
            resU.is_staff,
            resU.is_admin,
        )
    }
}