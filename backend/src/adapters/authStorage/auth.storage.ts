import { CredentialModel, UserModel } from '../../domain/models';
import {EntityManager, QueryFailedError} from 'typeorm';
import { Credential, User } from '../../databases/postgres/entities';
import {PG_UNIQUE_VIOLATION} from "@drdgvhbh/postgres-error-codes";
import {AlreadyExist, Database} from "../../errors";

export class AuthStorage {
    public constructor(private manager: EntityManager) {}

    public async Create(
        credential: CredentialModel,
        user: UserModel,
    ): Promise<void> {
        try {
            await this.manager.transaction(async (manager) => {
                await manager.insert(Credential, {
                    id: credential.id,
                    login: credential.login,
                    password_hash: credential.password_hash,
                    email: credential.email,
                });
                await manager.insert(User, {
                    id: user.id,
                    username: user.username,
                    first_name: user.first_name,
                    second_name: user.second_name,
                    day_of_birth: user.day_of_birth,
                    gender: user.gender,
                    date_create: user.date_create,
                    date_modify: user.date_modify,
                });
            });
        } catch (e) {
            if (e instanceof QueryFailedError) {
                const err: any = e;
                switch (err.code) {
                    case PG_UNIQUE_VIOLATION: {
                        switch (err.constraint) {
                            case 'user_username_uniq':
                                throw new AlreadyExist("username")
                            case 'credential_login_uniq':
                                throw new AlreadyExist("login")
                            case 'credential_email_uniq':
                                throw new AlreadyExist("email")
                            default:
                                throw new AlreadyExist()
                        }
                    }
                }
            }
            throw new Database()
        }

        return;
    }

    public async ReadByLogin(login: string): Promise<CredentialModel | null> {
        try {
            const resp = await this.manager.findOne(Credential, {
                where: {
                    login: login,
                },
            });

            if (!resp) {
                return null;
            }

            return new CredentialModel(
                resp.id,
                resp.login,
                resp.password_hash,
                resp.email,
            );
        } catch (e) {
            throw e;
        }
    }
}
