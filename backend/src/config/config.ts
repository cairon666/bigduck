import * as dotenv from 'dotenv'
import * as path from "path";
import {fromStringToBool} from "../utils";

export interface IConfig {
    POSTGRES_URL: string
    APP_PORT: number;
    APP_HOST: string;
    APP_DEBUG: boolean;
}

export class Config implements IConfig {
    public POSTGRES_URL: string
    public APP_PORT: number;
    public APP_HOST: string;
    public APP_DEBUG: boolean;

    public constructor() {
        dotenv.config({
            path: path.resolve(process.cwd(), ".env"),
            debug: fromStringToBool(process.env.DEBUG),
        })

        this.POSTGRES_URL = process.env.POSTGRES_URL || "postgresql://admin:admin@localhost:5432/root"
        this.APP_PORT = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000
        this.APP_HOST = process.env.APP_HOST || "localhost"
        this.APP_DEBUG = process.env.DEBUG ? fromStringToBool(process.env.DEBUG) : true
    }
}