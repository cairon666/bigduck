import * as dns from 'dns';
import { UserConfig, defineConfig, mergeConfig } from 'vite';
import build from './.config/vite/build';
import common from './.config/vite/common';
import { Config } from './.config/vite/config';
import plugins from './.config/vite/plugins';
import server from './.config/vite/server';

dns.setDefaultResultOrder('verbatim');

const config = defineConfig((env) => {
    const config: Config = {
        isProd: process.env.NODE_ENV == 'production',
        isDev: process.env.NODE_ENV == 'development',
        env: process.env,
        viteEnv: env,
        dirname: __dirname,
    };

    let userConfig: UserConfig = {};
    const configs = [
        common(config), 
        build(config),
        plugins(config), 
        server(config), 
    ];

    userConfig = configs.reduce((prev, cur) => {
        return mergeConfig(prev, cur);
    }, userConfig);


    return userConfig;
})

export default config;