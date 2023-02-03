import {Config} from "../../config";
import {createClient, RedisClientType} from "redis";

export class RedisController {
    private client: RedisClientType

    constructor(conf: Config, database: number) {
        this.client = createClient({
            url: `redis://${conf.REDIS.USER}:${conf.REDIS.PASSWORD}@${conf.REDIS.HOST}:${conf.REDIS.PORT}/${database}`,
        })

        this.client.on('error', err => console.log('Redis Client Error', err));
        this.client.on('GET', err => console.log('Redis Client Error', err));
    }

    public async connect() {
        await this.client.connect()
    }

    public async SET(key: string, value: string, opt?: {
        EX: number
    }) {
        await this.client.SET(key, value, opt)
    }

    public async GET(key: string): Promise<string | null> {
        return await this.client.GET(key)
    }

    public async HSET(key: string, fields: string, value: string): Promise<number | null> {
        return await this.client.HSET(key, fields, value)
    }

    public async HGET(key: string, fields: string): Promise<string | undefined> {
        return await this.client.HGET(key, fields)
    }
}