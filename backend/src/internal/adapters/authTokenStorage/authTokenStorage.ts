import {RedisController} from "../../db/redis";
import * as CryptoJS from "crypto-js";

const hourInSecond = 60 * 60
const monthInSecond = 60 * 60 * 24 * 30

export class AuthTokenStorage {
    private redis: RedisController

    constructor(redis: RedisController) {
        this.redis = redis
    }

    public async setNew(value: string): Promise<{
        access: string,
        refresh: string
    }> {
        const accessToken = this.generateHash(value)
        const refreshToken = this.generateHash(accessToken)

        await this.redis.SET(accessToken, value, {
            EX: hourInSecond
        })
        await this.redis.SET(refreshToken, accessToken, {
            EX: monthInSecond,
        })

        return {
            access: accessToken,
            refresh: refreshToken
        }
    }

    public async set(key: string, value: string): Promise<void> {
        await this.redis.SET(key, value)
    }

    public async get(key: string): Promise<string | null> {
        return await this.redis.GET(key)
    }

    private generateHash(value: string): string {
        const privateKey = "12345678"
        const hashDigest = CryptoJS.SHA256(value);
        const hmacDigest = Buffer.from(CryptoJS.HmacSHA256(hashDigest, privateKey).toString()).toString('base64')
        return hmacDigest
    }
}