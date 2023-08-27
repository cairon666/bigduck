import * as dns from 'dns';
import * as path from 'path';

import image from '@rollup/plugin-image';
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react-swc';
import analyze from 'rollup-plugin-analyzer';
import visualizer from 'rollup-plugin-visualizer';
import basicSsl from '@vitejs/plugin-basic-ssl';
import { defineConfig } from 'vite';

dns.setDefaultResultOrder('verbatim');

const srcPath = path.join(__dirname, 'src');
const buildPath = path.join(__dirname, 'build');

const isBuild = process.env.NODE_ENV == 'production';
const isDev = process.env.NODE_ENV == 'development';

export default defineConfig({
    appType: 'spa',
    base: './',
    envDir: path.resolve(__dirname),
    publicDir: path.resolve(__dirname, 'public'),
    root: srcPath,
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
        // for auto generate ssl cert
        basicSsl(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            'src': path.resolve(__dirname, 'src'),
            'api': path.resolve(__dirname, 'src/shared/api'),
            'const': path.resolve(__dirname, 'src/shared/const'),
            'hooks': path.resolve(__dirname, 'src/shared/hooks'),
            'storage': path.resolve(__dirname, 'src/shared/storage'),
            'uikit': path.resolve(__dirname, 'src/shared/UIKit'),
            'utils': path.resolve(__dirname, 'src/shared/utils'),
        },
    },
    server: {
        https: true,
        host: 'localhost',
        port: 8080,
        open: true,
        proxy: {
            '/api/v1': {
                target: 'https://localhost:3000',
            },
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*',
        },
    },
    build: {
        outDir: buildPath,
        rollupOptions: {
            plugins: [analyze()],
        },
        emptyOutDir: true,
    },
    esbuild: {
        jsxFactory: 'h',
        jsxFragment: 'Fragment',
    },
});
