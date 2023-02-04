import {after, before, describe, it} from "node:test";
import * as assert from "assert";
import {AuthTokenProvider} from "./authTokenProvider";
import {RedisController} from "../../db/redis";
import {LoadEnv} from "../../config";

let authTokenStorage: AuthTokenProvider
let redisController: RedisController
const testValue = JSON.stringify({
    some: "test",
})


describe('auth token storage', async function () {
    before(async () => {
        const config = LoadEnv()

        redisController = new RedisController(config, 0)
        await redisController.connect()
        authTokenStorage = new AuthTokenProvider(redisController)
    })

    describe("tests", () => {
        after(async () => {
            await redisController.disconnect()
        })

        it('setNew default', async function () {
            const res = await authTokenStorage.setNew(testValue)
            console.log(res)
            if (!res) {
                assert.ok(false)
                return
            }

            const resAccess = await authTokenStorage.get(res.access)
            console.log(resAccess)
            if (!resAccess || resAccess != testValue) {
                assert.ok(false)
                return
            }

            assert.ok(true)
        });

        it('setNew empty', async function () {
            const res = await authTokenStorage.setNew("") // TODO
            console.log(res)
            if (!res) {
                assert.ok(false)
                return
            }

            assert.ok(true)
        });

        it('refresh default', async function () {
            const res = await authTokenStorage.setNew(testValue)
            console.log(res)
            if (!res) {
                assert.ok(false)
                return
            }

            const resRefresh = await authTokenStorage.refresh(res.refresh)
            console.log(resRefresh)
            if (!resRefresh) {
                assert.ok(false)
                return
            }

            assert.ok(true)
        });
    })
});