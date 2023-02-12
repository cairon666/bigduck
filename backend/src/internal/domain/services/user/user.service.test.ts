import { after, before, describe, it } from 'node:test';
import { LoadEnv } from '../../../config';
import { NewDevLogger } from '../../../../pkg/logger';
import { NewDataSource } from '../../../db/postgres';
import { DataSource } from 'typeorm';
import { UserService } from './user.service';
import { UserDB } from '../../../db/postgres/user.models';
import { getUserDTO, updateUserDTO } from './dto';
import assert from 'assert';
import { Beda } from '../../../../pkg/beda/Beda';
import { Exceptions } from '../../exceptions/exceptions';

let userService: UserService;
let postgresClient: DataSource;

describe('auth service', async function () {
    before(async () => {
        const config = LoadEnv();
        const logger = NewDevLogger();
        config.APP.DEBUG = false;
        postgresClient = await NewDataSource(config);
        const userRepo = await postgresClient.getRepository(UserDB);
        userService = new UserService(logger, userRepo);
    });
    after(async () => {
        await postgresClient.destroy();
    });

    describe('methods', () => {
        it('should success getUserDTO', async () => {
            const dto = new getUserDTO('c8bc0626-7934-4729-b550-3983d8f49a25');

            try {
                await userService.getUser(dto);
                assert.ok(true);
            } catch (e) {
                assert.fail(e as Error);
            }
        });

        it('should success getUpdateDTO', async () => {
            const dto = new updateUserDTO(
                'c8bc0626-7934-4729-b550-3983d8f49a25',
                'test.users.update',
                'test.users.update',
                'test.users.update',
                null,
                null,
                null,
            );

            try {
                await userService.updateUser(dto);
                assert.ok(true);
            } catch (e) {
                assert.fail(e as Error);
            }
        });

        it('should fail getUpdateDTO', async () => {
            const dto = new updateUserDTO(
                'c8bc0626-7934-4729-b550-3983d8f49a25',
                'test.auth.duplicate',
                'test.users.update',
                'test.users.update',
                null,
                null,
                null,
            );

            try {
                await userService.updateUser(dto);
                assert.fail('should be error');
            } catch (e) {
                if (e instanceof Beda) {
                    if (e.getTitle() === Exceptions.UsernameAlreadyExist) {
                        assert.ok(true);
                    } else {
                        assert.fail(e);
                    }
                } else {
                    assert.fail(e as Error);
                }
            }
        });
    });

    describe('dto', () => {
        it('should updateUserDTO success', async () => {
            const dto = new updateUserDTO(
                'c8bc0626-7934-4729-b550-3983d8f49a24',
                'test.auth',
                'test.auth',
                'test.auth',
                null,
                null,
                null,
            );

            try {
                dto.isValid();
                assert.ok(true);
            } catch (e) {
                assert.fail(e as Error);
            }
        });

        it('should getUserDTO success', async () => {
            const dto = new getUserDTO('c8bc0626-7934-4729-b550-3983d8f49a24');

            try {
                dto.isValid();
                assert.ok(true);
            } catch (e) {
                assert.fail(e as Error);
            }
        });
    });
});
