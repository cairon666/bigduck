import {after, before, describe, it} from "node:test";
import * as assert from "assert";
import {NewDataSource} from "../../../db/postgres";
import {AuthService} from "./auth.service";
import {LoadEnv} from "../../../config";
import {LoginDTO, RegisterDTO} from "./dto";
import {Beda} from "../../../../pkg/beda/Beda";
import {AlreadyExistError, AuthBadPassword, AuthNotFound} from "../../exceptions/exceptions";
import {DataSource} from "typeorm";

let authService: AuthService
let postgresClient: DataSource

describe('auth service', async function () {
    before(async () => {
        const config = LoadEnv()
        postgresClient = await NewDataSource(config)
        const managerStorage = await postgresClient.manager
        authService = new AuthService(
            managerStorage
        )
    })

    describe('tests', function () {
        after(async () => {
            await postgresClient.destroy()
        })

        it('should create default success', async function () {
            const regDto = new RegisterDTO(
                "test",
                "test",
                "test",
                "test",
                "test@test.test",
            )

            const resReg = await authService.Register(regDto)

            if (resReg.id == "") {
                assert.ok(false)
                return
            }

            const resLog = await authService.Login(new LoginDTO(
                regDto.login,
                regDto.password
            ))

            if (resLog.id == "") {
                assert.ok(false)
                return
            }

            assert.ok(true)
        });

        it('should error register validate', async function () {
            try {
                await authService.Register(new RegisterDTO(
                    "test_test",
                    "test_test",
                    "test_test",
                    "test_test",
                    "test_test",
                ))

                assert.ok(false)
            } catch (e) {
                if (e instanceof Error) {
                    if (e.message === AlreadyExistError("login")) {
                        assert.ok(true)
                    } else {
                        assert.fail(e)
                    }
                    return
                }
            }
        });

        it('should error register already-exist', async function () {
            try {
                await authService.Register(new RegisterDTO(
                    "",
                    "",
                    "",
                    "",
                    "",
                ))

                assert.ok(false)
            } catch (e) {
                if (e instanceof Beda) {
                    if (e.getTitle() == "validate") {
                        assert.ok(true)
                    }
                } else if (e instanceof Error) {
                    assert.fail(e)
                }
            }
        });

        it('should error login non-exist', async function () {
            try {
                await authService.Login(new LoginDTO(
                    "test666999",
                    "test666999"
                ))

                assert.ok(false)
            } catch (e) {
                if (e instanceof Error) {
                    if (e.message == AuthNotFound) {
                        assert.ok(true)
                    } else {
                        assert.fail(e)
                    }
                    return
                }
                assert.fail(e as any)
            }
        });

        it('should error login wrong password', async function () {
            try {
                await authService.Login(new LoginDTO(
                    "test_test",
                    "test_wrong",
                ))

                assert.ok(false)
            } catch (e) {
                if (e instanceof Error) {
                    if (e.message == AuthBadPassword) {
                        assert.ok(true)
                    } else {
                        assert.fail(e)
                    }
                    return
                }
                assert.ok(false)
            }
        });
    });
});