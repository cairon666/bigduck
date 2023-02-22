import * as dns from 'dns';
import fs from 'fs';
import * as path from 'path';

import image from '@rollup/plugin-image';
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react-swc';
import analyze from 'rollup-plugin-analyzer';
import visualizer from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

dns.setDefaultResultOrder('verbatim');

const src = path.join(process.cwd(), 'src');
const build = path.join(process.cwd(), 'build');

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
    base: '/',
    plugins: [
        react(),
        visualizer({
            emitFile: true,
            filename: 'stats.html',
        }),
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
        https: {
            key: fs.readFileSync(path.join(process.cwd(), '.config', 'cert', 'example.com+5-key.pem')),
            cert: fs.readFileSync(path.join(process.cwd(), '.config', 'cert', 'example.com+5.pem')),
        },
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
