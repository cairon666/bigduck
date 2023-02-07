export interface Config {
    POSTGRES: {
        PASSWORD: string;
        USER: string;
        DATABASE: string;
        PORT: string;
        HOST: string;
    };
    REDIS: {
        HOST: string;
        PORT: string;
        USER: string;
        PASSWORD: string;
    };
    APP: {
        PORT: string;
        DEBUG: boolean;
    };
}

export function LoadEnv(): Config {
    return {
        POSTGRES: {
            USER: process.env.POSTGRES_USER || 'admin',
            PASSWORD: process.env.POSTGRES_PASSWORD || 'admin',
            DATABASE: process.env.POSTGRES_DATABASE || 'root',
            PORT: process.env.POSTGRES_PORT || '5432',
            HOST: process.env.POSTGRES_HOST || 'localhost',
        },
        REDIS: {
            PORT: process.env.REDIS_PORT || '6379',
            HOST: process.env.REDIS_HOST || 'localhost',
            USER: process.env.REDIS_USER || 'default',
            PASSWORD: process.env.REDIS_PASSWORD || 'admin',
        },
        APP: {
            PORT: process.env.APP_PORT || '3000',
            DEBUG:
                process.env.APP_DEBUG === 'true'
                    ? true
                    : process.env.APP_DEBUG === 'false'
                    ? false
                    : true,
        },
    };
}
