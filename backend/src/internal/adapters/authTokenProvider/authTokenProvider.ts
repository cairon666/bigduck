import { RedisController } from '../../db/redis';
import * as CryptoJS from 'crypto-js';

const hourInSecond = 60 * 60;

interface TokenRefreshUnit {
    lastDate: number;
    value: string;
    accessToken: string;
}

export class AuthTokenProvider {
    private redis: RedisController;

    public constructor(redis: RedisController) {
        this.redis = redis;
    }

    public async setNew(
        value: string,
    ): Promise<{ access: string; refresh: string }> {
        const accessToken = this.generateHash(value + Date.now());
        const refreshToken = this.generateHash(accessToken);

        await this.redis.SET(accessToken, value, {
            EX: hourInSecond,
        });

        const refreshUnit: TokenRefreshUnit = {
            lastDate: Date.now(),
            value: value,
            accessToken: accessToken,
        };
        await this.redis.SET(refreshToken, JSON.stringify(refreshUnit));

        return {
            access: accessToken,
            refresh: refreshToken,
        };
    }

    public async refresh(
        refreshToken: string,
    ): Promise<{ accessToken: string } | null> {
        const res = await this.redis.GET(refreshToken);

        if (!res) {
            return null;
        }

        const resJson: TokenRefreshUnit = JSON.parse(res);

        const accessToken = this.generateHash(resJson.value + Date.now());

        await this.redis.SET(accessToken, resJson.value, {
            EX: hourInSecond,
        });
        const refreshUnit: TokenRefreshUnit = {
            lastDate: Date.now(),
            value: resJson.value,
            accessToken: accessToken,
        };
        await this.redis.SET(refreshToken, JSON.stringify(refreshUnit));

        return {
            accessToken: accessToken,
        };
    }

    public async set(key: string, value: string): Promise<void> {
        await this.redis.SET(key, value);
    }

    public async get(key: string): Promise<string | null> {
        return await this.redis.GET(key);
    }

    private generateHash(value: string): string {
        const privateKey = '12345678';
        const hashDigest = CryptoJS.SHA256(value);
        const hmacDigest = Buffer.from(
            CryptoJS.HmacSHA256(hashDigest, privateKey).toString(),
        ).toString('base64');
        return hmacDigest;
    }
}
