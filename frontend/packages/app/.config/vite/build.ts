import { UserConfig } from "vite";
import { Config } from "./config";
import * as path from 'path';
import analyze from 'rollup-plugin-analyzer';


export default function build(cnf: Config): UserConfig {
    return {
        build: {
            outDir: path.join(cnf.dirname, 'build'),
            rollupOptions: {
                plugins: [analyze()],
            },
            emptyOutDir: true,
        },
        esbuild: {
            jsxFactory: 'h',
            jsxFragment: 'Fragment',
        },
    }
}