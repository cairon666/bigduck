import { after, before, describe, it } from "node:test";
import { NewDataSource } from "../../../db/postgres";
import { AuthService } from "./auth.service";
import { LoadEnv } from "../../../config";
import { DataSource } from "typeorm";
import { NewDevLogger } from "../../../../pkg/logger";
import { LoginDTO, RegisterDTO } from "./dto";
import assert from "assert";
import { Beda } from "../../../../pkg/beda/Beda";
import { Exceptions } from "../../exceptions/exceptions";

let authService: AuthService;
let postgresClient: DataSource;

describe("auth service", async function () {
    before(async () => {
        const config = LoadEnv();
        const logger = NewDevLogger();
        config.APP.DEBUG = false;
        postgresClient = await NewDataSource(config);
        const managerStorage = await postgresClient.manager;
        authService = new AuthService(logger, managerStorage);
    });
    after(async () => {
        await postgresClient.destroy();
    });

    describe("methods", () => {
        it("should success register and login", async () => {
            const regDTO = new RegisterDTO(
                "test.auth",
                "test.auth",
                false,
                false,
                null,
                "test.auth@email.com",
                "test.auth",
                "test.auth",
                "test.auth",
                null,
                null,
                null
            );

            try {
                await authService.Register(regDTO);
            } catch (e) {
                assert.fail((e as Error).message);
                return;
            }

            const loginDTO = new LoginDTO("test.auth", "test.auth");

            try {
                await authService.Login(loginDTO);
            } catch (e) {
                assert.fail((e as Error).message);
                return;
            }
        });

        it("should success login", async () => {
            const loginDTO = new LoginDTO("test.auth.duplicate", "super_test1");

            try {
                await authService.Login(loginDTO);
                assert.ok(true);
            } catch (e) {
                assert.fail((e as Error).message);
            }
        });

        it("should bad password login", async () => {
            const loginDTO = new LoginDTO(
                "test.auth.duplicate",
                "test.auth.duplicate"
            );

            try {
                await authService.Login(loginDTO);
            } catch (e) {
                if (e instanceof Beda) {
                    if (e.getTitle() === Exceptions.BadPassword) {
                        assert.ok(true);
                    } else {
                        assert.fail(e.getTitle());
                    }
                } else {
                    assert.fail((e as Error).message);
                }
            }
        });

        it("should error duplicate register", async () => {
            const regDTO = new RegisterDTO(
                "test.auth.duplicate",
                "test.auth.duplicate",
                false,
                false,
                null,
                "test.auth.duplicate@email.com",
                "test.auth.duplicate",
                "test.auth.duplicate",
                "test.auth.duplicate",
                null,
                null,
                null
            );

            try {
                await authService.Register(regDTO);
                assert.fail("should error");
            } catch (e) {
                assert.ok(true);
                return;
            }
        });

        it("should error duplicate email", async () => {
            const regDTO = new RegisterDTO(
                "test.auth.duplicate1",
                "test.auth.duplicate",
                false,
                false,
                null,
                "test.auth.duplicate@email.com",
                "test.auth.duplicate",
                "test.auth.duplicate",
                "test.auth.duplicate",
                null,
                null,
                null
            );

            try {
                await authService.Register(regDTO);
                assert.fail("should error");
            } catch (e) {
                assert.ok(true);
                return;
            }
        });

        it("should error duplicate username", async () => {
            const regDTO = new RegisterDTO(
                "test.auth.duplicate1",
                "test.auth.duplicate",
                false,
                false,
                null,
                "test.auth.duplicate@email.com2",
                "test.auth.duplicate",
                "test.auth.duplicate",
                "test.auth.duplicate",
                null,
                null,
                null
            );

            try {
                await authService.Register(regDTO);
                assert.fail("should error");
            } catch (e) {
                assert.ok(true);
                return;
            }
        });
    });

    describe("dto", () => {
        it("should success RegisterDTO valid", () => {
            try {
                const dto = new RegisterDTO(
                    "test.auth",
                    "test.auth",
                    false,
                    false,
                    null,
                    "test.auth@email.com",
                    "test.auth",
                    "test.auth",
                    "test.auth",
                    null,
                    null,
                    null
                );
                dto.isValid();
            } catch (e) {
                assert.fail((e as Error).message);
            }
        });

        it("should success LoginDTO valid", () => {
            try {
                const dto = new LoginDTO("test.auth", "test.auth");
                dto.isValid();
            } catch (e) {
                assert.fail((e as Error).message);
            }
        });

        it("should invalid loginDTO error", () => {
            try {
                const dto = new LoginDTO("", "");
                dto.isValid();
                assert.fail("should error");
            } catch (e) {
                assert.ok(true);
            }
        });

        it("should invalid registerDTO error", () => {
            try {
                const dto = new RegisterDTO(
                    "",
                    "",
                    false,
                    false,
                    null,
                    "",
                    "",
                    "",
                    "",
                    null,
                    null,
                    null
                );
                dto.isValid();
                assert.fail("should error");
            } catch (e) {
                assert.ok(true);
            }
        });
    });
});
