import { UserConfig } from "vite";
import { Config } from "./config";

export default function server(cnf: Config): UserConfig {
    return cnf.isDev ? {
        server: {
            https: true,
            host: 'localhost',
            port: 8080,
            open: true,
            proxy: {
                '/api/v1': {
                    target: 'http://localhost:3000',
                },
            },
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': '*',
            },
        },
    } : {};
}