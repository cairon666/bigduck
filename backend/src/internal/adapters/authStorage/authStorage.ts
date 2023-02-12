import {EntityManager, QueryFailedError} from "typeorm";
import {Logger} from "../../../pkg/logger";
import {Credential, User, UserLoginResponse} from "../../domain/models/user";
import {CredentialDB} from "../../db/postgres/credential.models";
import {UserDB} from "../../db/postgres/user.models";
import {Beda} from "../../../pkg/beda/Beda";
import {CodeError, Exceptions} from "../../domain/exceptions/exceptions";
import {PG_UNIQUE_VIOLATION} from "@drdgvhbh/postgres-error-codes";
import {DatabaseCodes} from "../../domain/exceptions/database";
import {unknownBedaDatabase} from "../../domain/services/utils";

export class AuthStorage {
    private managerStorage: EntityManager;
    private logger: Logger;

    public constructor(logger: Logger, managerStorage: EntityManager) {
        this.logger = logger
        this.managerStorage = managerStorage
    }

    public async register(credential: Credential, user: User): Promise<void> {
        const credentialDB = new CredentialDB(
            credential.id,
            credential.login,
            credential.password_hash,
            credential.is_staff,
            credential.is_admin,
            credential.phone,
            credential.email,
        );
        const userDB = new UserDB(
            user.id,
            user.username,
            user.first_name,
            user.second_name,
            user.avatar_url,
            user.day_of_birth,
            user.gender,
            new Date(),
            new Date(),
        );

        try {
            await this.managerStorage.transaction(async (mgr) => {
                await mgr.insert(CredentialDB, credentialDB);
                await mgr.insert(UserDB, userDB);
            });
        } catch (e) {
            throw this.parseRegisterError(e)
        }
    }

    private parseRegisterError(e: unknown): Beda {
        const beda = new Beda(Exceptions.Database, CodeError.Database)
        if (e instanceof QueryFailedError) {
            const err: any = e;
            switch (err.code) {
                case PG_UNIQUE_VIOLATION: {
                    switch (err.constraint) {
                        case 'users_username_uniq':
                            beda.addDesc(DatabaseCodes.UsernameAlreadyExist)
                            break
                        case 'credentials_login_uniq':
                            beda.addDesc(DatabaseCodes.LoginAlreadyExist)
                            break
                        case 'credentials_email_uniq':
                            beda.addDesc(DatabaseCodes.EmailAlreadyExist)
                            break
                        default:
                            beda.addDesc(DatabaseCodes.SomeAlreadyExist)
                            break
                    }
                    break
                }
                default: {
                    beda.addDesc(DatabaseCodes.Unknown)
                }
            }
        }
        throw beda
    }

    public async login(login: string): Promise<UserLoginResponse | null> {
        let cred: CredentialDB | null;
        try {
            cred = await this.managerStorage
                .getRepository(CredentialDB)
                .createQueryBuilder("credential")
                .where({
                    login: login
                })
                .innerJoinAndSelect("credential.user", "user")
                .getOne()
        } catch (e) {
            throw unknownBedaDatabase()
        }

        if (!cred || !cred.user) {
            return null
        }

        return {
            id: cred.id,
            login: cred.login,
            password_hash: cred.password_hash,
            is_staff: cred.is_staff,
            is_admin: cred.is_admin,
            phone: cred.phone,
            email: cred.email,
            user: {
                id: cred.user.id,
                username: cred.user.username,
                first_name: cred.user.first_name,
                second_name: cred.user.second_name,
                avatar_url: cred.user.avatar_url,
                day_of_birth: cred.user.day_of_birth,
                gender: cred.user.gender,
            }
        }
    }
}