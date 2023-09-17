import { UserConfig } from "vite";
import { Config } from "./config";
import { join, resolve }from 'path';

export default function common(cnf: Config): UserConfig {
    return {
        appType: 'spa',
        base: "./",
        publicDir: join(cnf.dirname, 'public'),
        envDir: join(cnf.dirname, "env"),
        root: join(cnf.dirname, 'src'),
        resolve: {
            alias: {
                "@app": resolve(cnf.dirname, 'src/app'),
                "@entities": resolve(cnf.dirname, 'src/entities'),
                "@features": resolve(cnf.dirname, 'src/features'),
                "@pages": resolve(cnf.dirname, 'src/pages'),
                "@shared": resolve(cnf.dirname, 'src/shared'),
                "@widgets": resolve(cnf.dirname, 'src/widgets'),
            },
        },
    };
}