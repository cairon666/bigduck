import { ConfigEnv } from "vite";

export interface Config {
    isProd: boolean
    isDev: boolean
    env: Record<string, string | undefined>
    viteEnv: ConfigEnv;
    dirname: string
}