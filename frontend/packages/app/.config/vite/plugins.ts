import { UserConfig } from "vite";
import { Config } from "./config";
import image from '@rollup/plugin-image';
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react-swc';
import visualizer from 'rollup-plugin-visualizer';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default function plugins(cnf: Config): UserConfig {
    const devPlugins = cnf.isDev ? [
        visualizer({
            emitFile: true,
            filename: 'stats.html',
        }),
        // for auto generate ssl cert
        basicSsl(),
    ] : [];

    return {
        plugins: [
            react(),
            legacy({
                targets: ['defaults', 'not IE 11'],
            }),
            {
                ...image(),
                enforce: 'pre',
            },
            ...devPlugins,
        ]
    }
}