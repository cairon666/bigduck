import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteSvgr from "vite-plugin-svgr";
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    base: "./",
    plugins: [
        viteSvgr({
            exportAsDefault: true
        }),
        react()
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/styles/global.scss" as *;`
            }
        }
    },
    appType: "spa",
})