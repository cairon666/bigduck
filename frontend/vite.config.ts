import * as dns from 'dns';
import * as path from 'path';

import react from '@vitejs/plugin-react-swc';
import analyze from 'rollup-plugin-analyzer';
import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy'
import image from '@rollup/plugin-image'

dns.setDefaultResultOrder('verbatim');

const src = path.join(process.cwd(), 'src');
const build = path.join(process.cwd(), 'build');

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
    plugins: [
        react(),
        legacy({
            targets: ['defaults', 'not IE 11'],
        }),
        {
            ...image(),
            enforce: 'pre',
        },
    ],
    root: src,
    appType: 'spa',
    server: {
        host: 'localhost',
        port: 8080,
    },
    build: {
        outDir: build,
        rollupOptions: {
            plugins: [analyze()],
        },
        emptyOutDir: true,
    },
    esbuild: {
        jsxFactory: 'h',
        jsxFragment: 'Fragment',
    },
}));
