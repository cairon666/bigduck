import { QueryFailedError, Repository } from 'typeorm';
import { User } from '../../../db/postgres/user.models';
import {
    getUserDTO,
    getUserRequestDTO,
    updateUserDTO,
    UserResponse,
} from './dto';
import { Beda } from '../../../../pkg/beda/Beda';
import { CodeError, Exceptions } from '../../exceptions/exceptions';
import { PG_UNIQUE_VIOLATION } from '@drdgvhbh/postgres-error-codes';
import { Logger } from '../../../../pkg/logger';
import {DatabaseCodes} from "../../exceptions/database";
import {bedaDatabase, unknownBedaDatabase} from "../utils";

export class UserService {
    private logger: Logger;
    private userRepo: Repository<User>;

    public constructor(logger: Logger, userRepo: Repository<User>) {
        this.logger = logger;
        this.userRepo = userRepo;
    }

    public async updateUser(dto: updateUserDTO): Promise<void> {
        dto.isValid();

        try {
            await this.userRepo
                .createQueryBuilder('user')
                .update()
                .set({
                    username: dto.username,
                    first_name: dto.first_name,
                    second_name: dto.second_name,
                    avatar_url: dto.avatar_url,
                    day_of_birth: dto.day_of_birth,
                    gender: dto.gender,
                    date_modify: new Date(),
                })
                .where('id = :id', { id: dto.id })
                .execute();
        } catch (e) {
            this.parseUpdateUserError(e)
        }
    }

    public async getUser(dto: getUserDTO): Promise<getUserRequestDTO> {
        dto.isValid();

        let user: User | null;
        try {
            user = await this.userRepo.findOne({
                where: {
                    id: dto.id,
                },
            });
        } catch (e) {
            throw unknownBedaDatabase()
        }

        if (!user) {
            throw bedaDatabase(DatabaseCodes.NotFound)
        }

        const userResp: UserResponse = {
            id: user.id,
            username: user.username,
            first_name: user.first_name,
            second_name: user.second_name,
            avatar_url: user.avatar_url,
            day_of_birth: user.day_of_birth,
            gender: user.gender,
        };

        return new getUserRequestDTO(userResp);
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
