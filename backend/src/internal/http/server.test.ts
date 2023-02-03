import {after, before, describe, it} from "node:test";
import {LoadEnv} from "../config";
import {NewDataSource} from "../db/postgres";
import {AuthService} from "../domain/services/auth/auth.service";
import assert from "assert";
import {RedisController} from "../db/redis";
import {AuthTokenStorage} from "../adapters/authTokenStorage/authTokenStorage";
import {HTTPServer} from "./server";
import {DataSource} from "typeorm";
import {Application} from "express";
import supertest = require("supertest");
import {Cookie, CookieAccessInfo} from "cookiejar";
import {NameCookieAccess, NameCookieRefresh} from "./types";
import {HTTP_STATUS_NO_CONTENT, HTTP_STATUS_OK} from "../../pkg/http-status";

let server: HTTPServer
let postgresClient: DataSource
let redisController: RedisController
let app: Application

let authTest: () => void

describe('auth service', async function () {
    before(async () => {
        const config = LoadEnv()

        redisController = new RedisController(config, 0)
        await redisController.connect()
        const authTokenStorage = new AuthTokenStorage(redisController)

        postgresClient = await NewDataSource(config)
        const managerStorage = await postgresClient.manager
        const authService = new AuthService(
            managerStorage
        )

        server = new HTTPServer(
            config,
            authService,
            authTokenStorage
        )
        server.setup()

        app = server.app
    })

    after(async () => {
        await redisController.disconnect()
        await postgresClient.destroy()
    })

    describe('auth', () => {
        it('login default', async function () {
            const agent = supertest.agent(app);
            const response = await agent.post('/api/v1/auth/login')
                .send({
                    login: "test_test",
                    password: "test_test"
                })
                .set('Content-Type', 'application/json')
                .expect('Content-Type', /json/)
                .expect(HTTP_STATUS_OK)
            const accessCookie: Cookie | undefined = agent.jar.getCookie(NameCookieAccess, CookieAccessInfo.All);
            const refreshCookie: Cookie | undefined = agent.jar.getCookie(NameCookieRefresh, CookieAccessInfo.All);

            console.log(accessCookie, refreshCookie)
            if (!accessCookie && !refreshCookie) {
                assert.ok(false)
                return
            }

            assert.ok(true)
        });


        it('register and login default', async function () {
            const agent = supertest.agent(app);

            const credential = {
                login: "test_test" + Math.random(),
                password: "test_test",
                first_name: "test_test",
                second_name: "test_test",
                email: "test_test" + Math.random(),
            }

            const respReg = await agent.post('/api/v1/auth/register')
                .send({
                    login: credential.login,
                    password: credential.password,
                    first_name: credential.first_name,
                    second_name: credential.second_name,
                    email: credential.email
                })
                .set('Content-Type', 'application/json')
                .expect('Content-Type', /json/)
                .expect(HTTP_STATUS_OK)

            if (!respReg.body.id) {
                console.log(respReg.body)
                assert.fail("not set id")
                return
            }

            const respLog = await agent.post('/api/v1/auth/login')
                .send({
                    login: credential.login,
                    password: credential.password,
                })
                .set('Content-Type', 'application/json')
                .expect('Content-Type', /json/)
                .expect(HTTP_STATUS_OK)

            const accessCookie: Cookie | undefined = agent.jar.getCookie(NameCookieAccess, CookieAccessInfo.All);
            const refreshCookie: Cookie | undefined = agent.jar.getCookie(NameCookieRefresh, CookieAccessInfo.All);

            if (!accessCookie && !refreshCookie) {
                assert.fail("not set cookie")
                return
            }

            assert.ok(true)
        });

        it('login and refresh default', async function () {
            const agent = supertest.agent(app);
            const respLogin = await agent.post('/api/v1/auth/login')
                .send({
                    login: "test_test",
                    password: "test_test"
                })
                .set('Content-Type', 'application/json')
                .expect('Content-Type', /json/)
                .expect(HTTP_STATUS_OK)
            let accessCookie: Cookie | undefined = agent.jar.getCookie(NameCookieAccess, CookieAccessInfo.All);
            let refreshCookie: Cookie | undefined = agent.jar.getCookie(NameCookieRefresh, CookieAccessInfo.All);

            console.log(accessCookie, refreshCookie)
            if (!accessCookie && !refreshCookie) {
                assert.fail("cookie login not set")
                return
            }

            const respRefresh = await agent.post('/api/v1/auth/refresh')
                .expect(HTTP_STATUS_NO_CONTENT)

            accessCookie= agent.jar.getCookie(NameCookieAccess, CookieAccessInfo.All);
            refreshCookie= agent.jar.getCookie(NameCookieRefresh, CookieAccessInfo.All);

            console.log(accessCookie, refreshCookie)
            if (!accessCookie && !refreshCookie) {
                assert.fail("cookie refresh not set")
                return
            }

            assert.ok(true)
        });
    })
});