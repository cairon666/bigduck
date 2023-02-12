import {Logger} from "../../../pkg/logger";
import {QueryFailedError, Repository} from "typeorm";
import {UserDB} from "../../db/postgres/user.models";
import {User} from "../../domain/models/user";
import {unknownBedaDatabase} from "../../domain/services/utils";
import {Beda} from "../../../pkg/beda/Beda";
import {CodeError, Exceptions} from "../../domain/exceptions/exceptions";
import {PG_UNIQUE_VIOLATION} from "@drdgvhbh/postgres-error-codes";
import {DatabaseCodes} from "../../domain/exceptions/database";

export class UserStorage {
    private logger: Logger;
    private userRepo: Repository<UserDB>;

    public constructor(logger: Logger, userRepo: Repository<UserDB>) {
        this.logger = logger;
        this.userRepo = userRepo;
    }

    public async getById(id: string): Promise<User | null> {
        let user: UserDB | null;
        try {
            user = await this.userRepo.findOne({
                where: {
                    id: id,
                },
            });
        } catch (e) {
            throw unknownBedaDatabase()
        }

        if (!user) {
            return null
        }

        return {
            id: user.id,
            username: user.username,
            first_name: user.first_name,
            second_name: user.second_name,
            avatar_url: user.avatar_url,
            day_of_birth: user.day_of_birth,
            gender: user.gender,
        }
    }

    public async updateById(id: string, set: Omit<User, "id">): Promise<void> {
        try {
            await this.userRepo
                .createQueryBuilder('user')
                .update()
                .set({
                    username: set.username,
                    first_name: set.first_name,
                    second_name: set.second_name,
                    avatar_url: set.avatar_url,
                    day_of_birth: set.day_of_birth,
                    gender: set.gender,
                    date_modify: new Date(),
                })
                .where('id = :id', { id: id })
                .execute();
        } catch (e) {
            this.parseUpdateUserError(e)
        }
    }

    private parseUpdateUserError(e: unknown) {
        const beda = new Beda(Exceptions.Database, CodeError.Database)
        if (e instanceof QueryFailedError) {
            const err: any = e
            switch (err.code) {
                case PG_UNIQUE_VIOLATION: {
                    switch (err.constraint) {
                        case 'users_username_uniq':
                            beda.addDesc(DatabaseCodes.UsernameAlreadyExist)
                            break
                        default:
                            beda.addDesc(DatabaseCodes.SomeAlreadyExist)
                            break
                    }
                    break
                }
                default:
                    beda.addDesc(DatabaseCodes.Unknown)
            }
            throw beda
        }
        throw beda
    }
}